using System;
using System.Collections.Generic;
using System.Linq;

namespace CareHub.Domain.Dtos
{
    public class ImpersonationPerson
    {
        #region Internals
        readonly List<string> roles;
        #endregion

        public string Email { get; }

        public string Name { get; }

        public IReadOnlyCollection<string> Roles => roles.AsReadOnly();

        public ImpersonationPerson(string email, IEnumerable<string> roles, string name = null)
        {
            Email = email ?? throw new ArgumentNullException(nameof(email));

            this.roles = new List<string>(roles ?? throw new ArgumentNullException(nameof(roles)));
            if (!this.roles.Any()) throw new ArgumentException("Roles are empty", nameof(roles));
            
            Name = name;
        }
    }
}
