using System.ComponentModel.DataAnnotations;

namespace AutenticacaoAPI.Data.DTOS
{
    public class AddUsuario
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Senhas não batem")]
        public string PasswordConfirmation { get; set; }
    }
}
