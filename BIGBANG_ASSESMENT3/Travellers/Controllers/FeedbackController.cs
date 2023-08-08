using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travellers.Interface;
using Travellers.Models;
using Travellers.Service;

namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepo tr;

        public FeedbackController(IFeedbackRepo tr)
        {
            this.tr = tr;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Feedback>> GetFeedback()
        {
            try
            {
                var feedbacks = tr.GetFeedback();

                return Ok(tr.GetFeedback());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Feedback> Post(Feedback feedback)
        {
            try
            {
                var addedFeedback = tr.PostFeedback(feedback);

                return Ok(tr.PostFeedback(feedback));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
