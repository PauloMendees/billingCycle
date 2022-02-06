using System.ComponentModel.DataAnnotations;

namespace BillingCycleAPI.Data.DTOS.Credits
{
    public class PostCreditDTO
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        [Range(0, 9999999999999)]
        public int Value { get; set; }

        [Required]
        public int billingCycleId { get; set; }
    }
}
