using BillingCycleAPI.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BillingCycleAPI.Data.DTOS.BillingCycle
{
    public class ReadBillingCycleDTO
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [Range(1, 12)]
        public int Mes { get; set; }

        [Required]
        [Range(1970, 2100)]
        public int Ano { get; set; }

        public virtual List<Credit> Creditos { get; set; }
        public virtual List<Debit> Debitos { get; set; }
    }
}
