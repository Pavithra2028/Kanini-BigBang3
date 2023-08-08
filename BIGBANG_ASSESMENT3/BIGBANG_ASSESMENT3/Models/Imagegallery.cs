using System.ComponentModel.DataAnnotations;
namespace BIGBANG_ASSESMENT3.Models
{
    public class Imagegallery
    {
        [Key]
        public int TourId { get; set; }
        public string? TourName { get; set; }
        public string? LocationImage { get; set; }
        public string? Description { get; set; }
    }
}
