using System.ComponentModel.DataAnnotations;

namespace AutenticacaoAPI.Data.DTOS
{
    public class LoginRequest
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
