using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Travellers.Models
{
    public class Feedback
    {
        [Key]
        public int feedback_id { get; set; }
        // Foreign Key to Traveller entity
        public int travellers_id { get; set; }
        [ForeignKey("travellers_id")] // Specify the foreign key property name
        public Traveller? travellers { get; set; }
        public int package_id { get; set; }
        public int rating { get; set; }
        public string comments { get; set; }
    }
}
