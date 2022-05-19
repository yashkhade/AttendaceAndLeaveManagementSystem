using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sprint1.Models;

namespace Sprint1
{
    public class SprintDbContext : DbContext
    {
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Leaves> Leaves { get; set; }
        public DbSet<Login> Login { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<EmployeeProject> EmployeeProject { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=tcp:attendanceandleave.database.windows.net,1433;Initial Catalog=ALMSDatabase;Persist Security Info=False;User ID=yash;Password=Y@sh123123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
        public SprintDbContext(DbContextOptions options) : base(options) { }

    }
}
