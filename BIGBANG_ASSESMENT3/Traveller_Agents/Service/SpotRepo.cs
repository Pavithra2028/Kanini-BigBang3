using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Traveller_Agents.Context;
using Traveller_Agents.Interface;
using Traveller_Agents.Models;
namespace Traveller_Agents.Service
{
    public class SpotRepo:ISpotRepo
    {
        private readonly TravelagentContext travelContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public SpotRepo(TravelagentContext con, IWebHostEnvironment webHostEnvironment)
        {
            travelContext = con;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<Spot> GetSpot()
        {
            return travelContext.spots.Include(t => t.tourpackages).ToList();
        }

        public async Task<Spot> CreateSpot([FromForm] Spot spot, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            spot.image1 = fileName;
            travelContext.spots.Add(spot);
            await travelContext.SaveChangesAsync();

            return spot;
        }
    }
}
