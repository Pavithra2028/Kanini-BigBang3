using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travellers.Interface;
using Travellers.Models;
using Travellers.Service;

namespace Travellers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravellersController : ControllerBase
    {
        private readonly ITravelRepo tr;

        public TravellersController(ITravelRepo tr)
        {
            this.tr = tr;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Traveller>> GetTravellers()
        {
            try
            {
                var travellers = tr.GetTravellers();

                return Ok(tr.GetTravellers());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Traveller> Post(Traveller traveller)
        {
            try
            {
                var addedTraveller = tr.PostTravellers(traveller);

                return Ok(tr.PostTravellers(traveller));
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public ActionResult<Traveller> TravellById(int id)
        {
            try
            {
                var tra = tr.TravellById(id);

                if (tra == null)
                {
                    return NotFound(); // Return a 404 response if the booking is not found
                }

                return Ok(tra);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{travellers_id}")]
        public IActionResult Put(int travellers_id, Traveller traveller)
        {
            try
            {
                if (travellers_id != traveller.travellers_id)
                    return BadRequest("Invalid traveller ID");

                tr.PostTravellers(traveller);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{travellers_id}")]
        public IActionResult Delete(int travellers_id)
        {
            try
            {
                tr.DeleteTravellers(travellers_id);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}