using Microsoft.AspNetCore.Mvc;
using Travellers.Models;

namespace Travellers.Interface
{
    public interface IBookingRepo
    {
        public IEnumerable<Booking> GetBooking();

        public Booking CreateBooking(Booking booking);

        Booking GetBookingById(int booking_id); 

    }
}
