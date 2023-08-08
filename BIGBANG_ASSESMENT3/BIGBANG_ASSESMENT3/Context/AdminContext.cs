using BIGBANG_ASSESMENT3.Models;
using Microsoft.EntityFrameworkCore;

namespace BIGBANG_ASSESMENT3.Context
{
    public class AdminContext:DbContext
    {
        public DbSet<Admin> admins { get; set; }

        public DbSet<TravelAgent> travelAgents { get; set; }
        
        public DbSet<Imagegallery> imagegallery { get; set; }
        public AdminContext(DbContextOptions<AdminContext> options) : base(options) { }

    }
}
