using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Traveller_Agents.Interface;
using Traveller_Agents.Models;

namespace Traveller_Agents.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpotController : ControllerBase
    {
        private readonly ISpotRepo tr;

        public SpotController(ISpotRepo tr)
        {
            this.tr = tr;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Spot>> Get()
        {
            try
            {
                return Ok(tr.GetSpot());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult<Spot>> Post([FromForm] Spot spot, IFormFile imageFile)
        {

            try
            {
                var createdCourse = await tr.CreateSpot(spot, imageFile);
                return CreatedAtAction("Get", new { id = createdCourse.spot_id }, createdCourse);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
    }
}
