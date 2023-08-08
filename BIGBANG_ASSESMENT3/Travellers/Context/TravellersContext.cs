using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Travellers.Models;

namespace Travellers.Context
{
    public class TravellersContext:DbContext
    {
        public DbSet<Traveller> travellers { get; set; }

        public DbSet<Payment> payment { get; set; }

        public DbSet<Feedback> feedback { get; set; }

        public DbSet<Booking> booking { get; set; } 

        public TravellersContext(DbContextOptions<TravellersContext> options) : base(options) { }

    }
}
