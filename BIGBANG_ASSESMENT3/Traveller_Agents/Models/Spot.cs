using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace Traveller_Agents.Models
{
    public class Spot
    {
        [Key]
        public int Id { get; set; }
        public int spot_id { get; set; }
        public string? image1 { get; set; }

        [ForeignKey("tourpackages")]
        public int package_id { get; set; }
        public Tourpackages? tourpackages { get; set; }

    }
}
