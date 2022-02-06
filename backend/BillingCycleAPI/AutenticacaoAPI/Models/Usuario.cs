using System;
using System.ComponentModel.DataAnnotations;

namespace AutenticacaoAPI.Models
{
    public class Usuario
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
