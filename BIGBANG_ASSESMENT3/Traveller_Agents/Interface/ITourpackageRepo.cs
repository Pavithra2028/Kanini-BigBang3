using Microsoft.AspNetCore.Mvc;
using Traveller_Agents.Models;

namespace Traveller_Agents.Interface
{
    public interface ITourpackageRepo
    {
        public IEnumerable<Tourpackages> GetTourpackages();
        public Task<Tourpackages> CreateTourPackage([FromForm] Tourpackages tourPackage, IFormFile imageFile);
        public Task<ICollection<Tourpackages>> GetTourPackageByTourId(int tourId);

        public Task<Tourpackages> GetTourpackageByid(int id);


    }
}
