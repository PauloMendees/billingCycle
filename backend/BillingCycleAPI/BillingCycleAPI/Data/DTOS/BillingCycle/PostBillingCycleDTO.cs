using System.ComponentModel.DataAnnotations;

namespace BillingCycleAPI.Data.DTOS.BillingCycle
{
    public class PostBillingCycleDTO
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        [Range(1, 12)]
        public int Mes { get; set; }

        [Required]
        [Range(1970, 2100)]
        public int Ano { get; set; }
    }
}
