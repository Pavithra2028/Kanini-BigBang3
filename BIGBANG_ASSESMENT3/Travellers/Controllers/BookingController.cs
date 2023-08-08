using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travellers.Interface;
using Travellers.Models;
using Travellers.Service;

namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepo tr;

        public BookingController(IBookingRepo tr)
        {
            this.tr = tr;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Booking>> GetBooking()
        {
            try
            {
                var bookings = tr.GetBooking();
                return Ok(tr.GetBooking());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{booking_id}")]
        public ActionResult<Booking> GetBookingById(int booking_id)
        {
            try
            {
                var booking = tr.GetBookingById(booking_id);

                if (booking == null)
                {
                    return NotFound(); // Return a 404 response if the booking is not found
                }

                return Ok(booking);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Booking> PostBooking(Booking booking)
        {
            return tr.CreateBooking(booking);
        }


    }
}
