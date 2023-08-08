using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using Traveller_Agents.Interface;
using Traveller_Agents.Models;
using Traveller_Agents.Service;

namespace Traveller_Agents.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourpackageController : ControllerBase
    {
        private readonly ITourpackageRepo tr;

        public TourpackageController(ITourpackageRepo tr)
        {
            this.tr = tr;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Tourpackages>> Get()
        {
            try
            {
                return Ok(tr.GetTourpackages());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult<Tourpackages>> Post([FromForm] Tourpackages tour, IFormFile imageFile)
        {

            try
            {
                var createdCourse = await tr.CreateTourPackage(tour, imageFile);
                return CreatedAtAction("Get", new { id = createdCourse.package_id }, createdCourse);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("TourId/{id}")]
        public async Task<ActionResult<ICollection<Tourpackages>>> GetTourPackageByTourId(int id)
        {
            try
            {
                var tourPackage = await tr.GetTourPackageByTourId(id);

                if (tourPackage == null)
                {
                    return NotFound(); 
                }
                return Ok(tourPackage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tourpackages>> GetPackageById(int id)
        {
            try
            {
                var tourpackage = await tr.GetTourpackageByid(id);
                if(tourpackage == null)
                {
                    return NotFound();
                }
                return Ok(tourpackage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
