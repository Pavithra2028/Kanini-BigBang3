using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Travellers.Models
{
    public enum ConfirmationStatus
    {
        [Display(Name = "Requested")]
        Requested,
        [Display(Name = "Confirmed")]
        Confirmed
    }
    public class Booking
    {
        [Key]
        public int booking_id { get; set; }
        [Required]
        public int travellers_id { get; set; }
        [ForeignKey("travellers_id")] // Specify the foreign key property name
        public Traveller? travellers { get; set; }
        public int package_id { get; set; }

        public string email { get; set; }

        public string city_of_residence { get; set; }

        public int no_of_people { get; set; }

        public long phone_number { get; set; }

        public int price { get; set; }

        public ConfirmationStatus IsConfirmed { get; set; }

        public DateTime BookingDate { get; set; }

        public Booking()
        {
            IsConfirmed = ConfirmationStatus.Requested;
            BookingDate = DateTime.Now;
        }
    }
}
