using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Entities;

namespace Scheduler.Web.Data
{
    public class SchedulerDbContext : DbContext
    {
        public SchedulerDbContext(DbContextOptions<SchedulerDbContext> options)
            : base(options)
        {
        }

        // 🔹 Tabeller
        public DbSet<ScheduleDay> ScheduleDays => Set<ScheduleDay>();
        public DbSet<ScheduleBlock> ScheduleBlocks => Set<ScheduleBlock>();
        public DbSet<Presenter> Presenters => Set<Presenter>();
        public DbSet<Guest> Guests => Set<Guest>();

    }
}

