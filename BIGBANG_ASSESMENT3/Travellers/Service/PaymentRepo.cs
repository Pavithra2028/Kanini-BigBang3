using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class PaymentRepo:IPaymentRepo
    {
        private readonly TravellersContext travellersContext;

        public PaymentRepo(TravellersContext con)
        {
            travellersContext = con;
        }
        public IEnumerable<Payment> GetPayment()
        {
            return travellersContext.payment.ToList();
        }

        public Payment PostPayment(Payment payment)
        {
            // Save the payment details
            travellersContext.payment.Add(payment);
            travellersContext.SaveChanges();

            // Get the associated booking and update the confirmation status to Confirmed
            Booking associatedBooking = travellersContext.booking.Find(payment.booking_id);
            if (associatedBooking != null)
            {
                associatedBooking.IsConfirmed = ConfirmationStatus.Confirmed;
                travellersContext.SaveChanges();
            }

            return payment;
        }

    }
}
