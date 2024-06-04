using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WAD11991.DAL.Models;

namespace WAD11991.DAL.Data
{
    public class TaskTrackerDbContext : DbContext
    {
        public TaskTrackerDbContext(DbContextOptions<TaskTrackerDbContext> options) : base(options)
        {

        }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<ProjectItem> Projects { get; set; }
    }
}
