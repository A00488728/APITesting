using APITesing.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace APITesing.Server.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<DataItems> DataItems { get; set; }
        public DbSet<UserInputs> UserInputs { get; set; }
    }

}



