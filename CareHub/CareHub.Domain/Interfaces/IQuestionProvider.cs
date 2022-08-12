using CareHub.Domain.Dtos;
using CareHub.Domain.Dtos.Reporting;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace CareHub.Domain.Interfaces
{
    public interface IQuestionProvider
    {
        List<QuestionDto> Get(string userId);
        long Create(QuestionDto questionDto, string userId);

        Task SubmitAnswersAsync(string userId, List<AnswerDto> answers, CancellationToken cancellationToken = default);
    }
}
