using System.ComponentModel.DataAnnotations;

namespace BIGBANG_ASSESMENT3.Models
{
    public class TravelAgent
    {
        [Key]
        public int traveller_agent_id { get; set; }

        [StringLength(100, ErrorMessage = "traveller_agent_name must not exceed 100 characters.")]

        public string? traveller_agent_name { get; set; }
        [StringLength(100, MinimumLength = 8, ErrorMessage = "traveller_agent_password must be at least 8 characters long.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
        ErrorMessage = "traveller_agent_password must contain at least one uppercase letter, one lowercase letter, and one special character.")]
        public string? traveller_agent_password { get; set; }

        public string? agentimage { get; set; }
        public string? Status { get; set; }

        public long Phonenumber { get; set; }
    }
}
