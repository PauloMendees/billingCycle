using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AutenticacaoAPI.Models
{
    public class CustomIdentity : IdentityUser<int>
    {
        [Required]
        public string Nome { get; set; }
    }
}
