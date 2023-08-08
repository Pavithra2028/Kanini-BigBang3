using Microsoft.EntityFrameworkCore;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class FeedbackRepo:IFeedbackRepo
    {
        private readonly TravellersContext travellersContext;

        public FeedbackRepo(TravellersContext con)
        {
            travellersContext = con;
        }
        public IEnumerable<Feedback> GetFeedback()
        {
            return travellersContext.feedback.Include(x=> x.travellers).ToList();
        }

        public Feedback PostFeedback(Feedback feedback)
        {
            var tr = travellersContext.booking.Where(s => s.travellers_id == feedback.travellers_id
                                                        && s.IsConfirmed == ConfirmationStatus.Confirmed
                                                        && s.package_id == feedback.package_id).ToList();
            if (tr.Count >= 1)
            {
                travellersContext.feedback.Add(feedback);
                travellersContext.SaveChanges();
                return feedback;
            }
            return null;
        }
    }
}
