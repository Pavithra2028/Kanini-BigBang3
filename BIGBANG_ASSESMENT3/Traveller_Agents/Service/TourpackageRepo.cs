using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Traveller_Agents.Context;
using Traveller_Agents.Interface;
using Traveller_Agents.Models;

namespace Traveller_Agents.Service
{
    public class TourpackageRepo : ITourpackageRepo
    {
        private readonly TravelagentContext travelContext;

        private readonly IWebHostEnvironment _webHostEnvironment;

        public TourpackageRepo(TravelagentContext con, IWebHostEnvironment webHostEnvironment)
        {
            travelContext = con;
            _webHostEnvironment= webHostEnvironment;
        }
        public IEnumerable<Tourpackages> GetTourpackages()
        {
            return travelContext.tour.Include(t=>t.spot).ToList();
        }

        public async Task<Tourpackages> CreateTourPackage([FromForm] Tourpackages tour, IFormFile imageFile)
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

            tour.image = fileName;
            travelContext.tour.Add(tour);
            await travelContext.SaveChangesAsync();

            return tour;
        }

        public async Task<ICollection<Tourpackages>> GetTourPackageByTourId(int tourId)
        {
            return await travelContext.tour
                                         .Include(t => t.spot)
                                         .Where(t => t.TourId == tourId).ToListAsync();
        }

        public async Task<Tourpackages> GetTourpackageByid(int id)
        {
            return await travelContext.tour.Include(t => t.spot).FirstOrDefaultAsync(t => t.package_id == id);
        }
    }
}
