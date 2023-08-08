using Travellers.Models;

namespace Travellers.Interface
{
    public interface ITravelRepo
    {
        public IEnumerable<Traveller> GetTravellers();
        public Traveller PostTravellers(Traveller travellers);
        public void PutTravellers(Traveller travellers);
        public void DeleteTravellers(int id);
        public Traveller TravellById(int id);

    }
}
