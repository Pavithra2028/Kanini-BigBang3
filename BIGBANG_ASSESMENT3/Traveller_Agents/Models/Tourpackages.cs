using System.ComponentModel.DataAnnotations;

namespace Traveller_Agents.Models
{
    public class Tourpackages
    {
        [Key]
        public int package_id { get; set; }
        public int? traveller_agent_id { get; set; }
        public int? TourId { get; set; }
        public string? packagename { get; set; }
        public string? hotel_name { get; set; }
        public string? food_details { get; set; }
        public string? speciality_of_the_place { get; set; }
        public string? iternary_details { get; set; }
        public string? image { get; set; }
        public int? price { get; set; }
        public string? vacation_type { get; set; }
        public string? duration { get; set; }

        public ICollection<Spot>? spot { get; set; }

    }
}
