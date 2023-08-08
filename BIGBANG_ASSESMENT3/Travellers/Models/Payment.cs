using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace Travellers.Models
{
    public class Payment
    {
        [Key]
        public int payment_id { get; set; }
        [ForeignKey("Booking")]
        public int booking_id { get; set; }
        public long card_number { get; set; }
        public int Expirymonth { get; set; }
        public int Expiryyear { get; set; }
        public string name { get; set; }
        public int cvv_number { get; set; }
        public int price { get; set; }
        public Booking? Booking { get; set; }
    }
}
