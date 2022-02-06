using System.ComponentModel.DataAnnotations;

namespace BillingCycleAPI.Data.DTOS.Credits
{
    public class ReadCreditDTO
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [Range(0, 9999999999999)]
        public int Value { get; set; }

        public int billingCycleId { get; set; }
    }
}
