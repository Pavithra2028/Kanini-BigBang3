using Microsoft.EntityFrameworkCore;
using Travellers.Context;
using Travellers.Interface;
using Travellers.Models;

namespace Travellers.Service
{
    public class TravelRepo:ITravelRepo
    {
        private readonly TravellersContext travellersContext;
        public TravelRepo(TravellersContext con)
        {
            travellersContext = con;
        }
        public IEnumerable<Traveller> GetTravellers()
        {
            return travellersContext.travellers.Include(x => x.booking).ToList();
        }
        public Traveller PostTravellers(Traveller traveller)
        {
            travellersContext.travellers.Add(traveller);
            travellersContext.SaveChanges();
            return traveller;
        }
        public void PutTravellers(Traveller travellers)
        {
            travellersContext.Entry(travellers).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            travellersContext.SaveChanges();
        }
        public void DeleteTravellers(int id)
        {
            Traveller traveller = travellersContext.travellers.FirstOrDefault(x => x.travellers_id == id);
            if (traveller != null)
            {
                travellersContext.travellers.Remove(traveller);
                travellersContext.SaveChanges();
            }
        }
        public Traveller TravellById(int id)
        {
            return travellersContext.travellers.FirstOrDefault(b => b.travellers_id == id);
        }
    }
}
