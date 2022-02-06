using System.ComponentModel.DataAnnotations;

namespace BillingCycleAPI.Data.DTOS.Debits
{
    public class PostDebitDTO
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        [Range(0, 9999999999999)]
        public int Value { get; set; }

        [Required]
        public int billingCycleId { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
