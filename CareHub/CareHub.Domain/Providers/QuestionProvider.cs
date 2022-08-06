using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using CareHub.Domain.Entities;
using CareHub.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Providers
{
    public class QuestionProvider : IQuestionProvider
    {
        private readonly DomainDbContext _context;

        public QuestionProvider(DomainDbContext context)
        {
            _context = context;
        }

        public List<QuestionDto> Get(string userId)
        {
            return AutoMapperHelper.Mapper.Map<List<QuestionDto>>(_context.Questions.Where(q => q.UserId == userId)
                .OrderByDescending(q => q.DateCreated));
        }

        public long Create(QuestionDto questionDto, string userId)
        {
            var question = AutoMapperHelper.Mapper.Map<Question>(questionDto);
            question.UserId = userId;
            question.DateCreated = DateTime.UtcNow;
            _context.Questions.Add(question);
            _context.SaveChanges();
            return question.Id;
        }

        public async Task SubmitAnswersAsync(string userId, List<AnswerDto> answers, CancellationToken cancellationToken = default)
        {
            var now = DateTime.UtcNow;

            await _context.Answers.AddRangeAsync(answers
                .Select(a => new Answer
                {
                    UserId = userId,
                    DateTime = now,
                    QuestionId = a.QuestionId,
                    AnswerId = a.AnswerId
                }
            ), cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
