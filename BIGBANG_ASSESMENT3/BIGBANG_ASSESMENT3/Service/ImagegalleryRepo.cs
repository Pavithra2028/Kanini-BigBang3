using BIGBANG_ASSESMENT3.Context;
using BIGBANG_ASSESMENT3.Interface;
using BIGBANG_ASSESMENT3.Models;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace BIGBANG_ASSESMENT3.Service
{
    public class ImagegalleryRepo:IGalleryRepo
    {
        private readonly  AdminContext travelContext;

        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImagegalleryRepo(AdminContext con, IWebHostEnvironment webHostEnvironment)
        {
            travelContext = con;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<Imagegallery> GetImage()
        {
            return travelContext.imagegallery.ToList();
        }
        public Imagegallery ImagegalleryById(int TourId)
        {
            try
            {
                return travelContext.imagegallery.FirstOrDefault(x => x.TourId == TourId);
            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<Imagegallery> PostImage([FromForm] Imagegallery img, IFormFile locationImage)
        {
            {
                if (locationImage == null || locationImage.Length == 0)
                {
                    throw new ArgumentException("Invalid file");
                }

                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(locationImage.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await locationImage.CopyToAsync(stream);
                }

                img.LocationImage = fileName;
                travelContext.imagegallery.Add(img);
                await travelContext.SaveChangesAsync();

                return img;
            }
        }
    }
}
