using Microsoft.AspNetCore.Mvc;
using Traveller_Agents.Models;

namespace Traveller_Agents.Interface
{
    public interface ISpotRepo
    {
        public IEnumerable<Spot> GetSpot();

        public Task<Spot> CreateSpot([FromForm] Spot spot, IFormFile imageFile);
    }
}
