using BIGBANG_ASSESMENT3.Interface;
using BIGBANG_ASSESMENT3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace BIGBANG_ASSESMENT3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagegalleryController : ControllerBase
    {
        private readonly IGalleryRepo tr;

        public ImagegalleryController(IGalleryRepo tr)
        {
            this.tr = tr;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Imagegallery>> Get()
        {
            try
            {
                return Ok(tr.GetImage());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{TourId}")]
        public Imagegallery? DoctorbyId(int TourId)
        {

            return tr.ImagegalleryById(TourId);
        }
        [HttpPost]
        public async Task<ActionResult<Imagegallery>> Post([FromForm] Imagegallery img, IFormFile imageFile)
        {
            try
            {
                var createdCourse = await tr.PostImage(img, imageFile);
                return CreatedAtAction("Get", new { id = createdCourse.TourId }, createdCourse);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
    }
}
