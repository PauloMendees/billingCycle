using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BillingCycleAPI.Models
{
    public class BillingCycle
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

        [JsonIgnore]
        public virtual List<Credit> Creditos { get; set; }

        [JsonIgnore]
        public virtual List<Debit> Debitos { get; set; }
    }
}
