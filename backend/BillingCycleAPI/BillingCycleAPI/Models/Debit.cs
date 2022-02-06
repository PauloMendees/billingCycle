using System.ComponentModel.DataAnnotations;

namespace BillingCycleAPI.Models
{
    public class Debit
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        [Range(0, 9999999999999)]
        public int Value { get; set; }

        [Required]
        public string Status { get; set; }

        public virtual BillingCycle BillingCycle { get; set; }
        public int billingCycleId { get; set; }
    }
}
