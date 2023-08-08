using BIGBANG_ASSESMENT3.Models;
using Microsoft.AspNetCore.Mvc;

namespace BIGBANG_ASSESMENT3.Interface
{
    public interface IGalleryRepo
    {
        public IEnumerable<Imagegallery> GetImage();

        public Task<Imagegallery> PostImage([FromForm] Imagegallery img, IFormFile locationImage);

        public Imagegallery ImagegalleryById(int TourId);

    }
}
