using Microsoft.AspNetCore.Mvc;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class BookingRepo:IBookingRepo
    {
        private readonly TravellersContext travellersContext;

        public BookingRepo(TravellersContext con)
        {
            travellersContext = con;
        }
        public IEnumerable<Booking> GetBooking()
        {
            return travellersContext.booking.ToList();
        }
        public Booking CreateBooking(Booking booking)
        {
            booking.IsConfirmed = ConfirmationStatus.Requested;
            travellersContext.booking.Add(booking);
            travellersContext.SaveChanges();
            return booking;
        }
        public Booking GetBookingById(int id)
        {
            return travellersContext.booking.FirstOrDefault(b => b.booking_id == id);
        }
    }
}
