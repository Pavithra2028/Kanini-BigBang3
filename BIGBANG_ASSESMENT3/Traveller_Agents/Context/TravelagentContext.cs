using Microsoft.EntityFrameworkCore;
using Traveller_Agents.Models;

namespace Traveller_Agents.Context
{
    public class TravelagentContext:DbContext
    {

        public DbSet<Tourpackages> tour { get; set; }  
        
        public DbSet<Spot> spots { get; set; }  

        public TravelagentContext(DbContextOptions<TravelagentContext> options) : base(options) { }
    }
}
