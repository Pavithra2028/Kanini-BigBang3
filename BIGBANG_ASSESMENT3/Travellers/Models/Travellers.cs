using System.ComponentModel.DataAnnotations;

namespace Travellers.Models
{
    public class Traveller
    {
        [Key]
        public int? travellers_id { get; set; }
        [StringLength(100, ErrorMessage = "travellers_name must not exceed 100 characters.")]
        public string? travellers_name { get; set; }
        [StringLength(100, MinimumLength = 8, ErrorMessage = "password must be at least 8 characters long.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
            ErrorMessage = "password must contain at least one uppercase letter, one lowercase letter, and one special character.")]
        public string? password { get; set; }
        public ICollection<Booking>? booking { get; set; }
    }
}
