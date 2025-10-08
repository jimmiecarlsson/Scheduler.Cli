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

        public DbSet<ScheduleDay> ScheduleDays { get; set; }
        public DbSet<ScheduleBlock> ScheduleBlocks { get; set; }
        public DbSet<Presenter> Presenters { get; set; }
        public DbSet<Guest> Guests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Primary keys
            modelBuilder.Entity<ScheduleDay>().HasKey(d => d.Id);
            modelBuilder.Entity<ScheduleBlock>().HasKey(b => b.Id);
            modelBuilder.Entity<Presenter>().HasKey(p => p.Id);
            modelBuilder.Entity<Guest>().HasKey(g => g.Id);

            // Relationer
            modelBuilder.Entity<ScheduleDay>()
                .HasMany(d => d.Blocks)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ScheduleBlock>()
                .HasMany(b => b.Presenters)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ScheduleBlock>()
                .HasMany(b => b.Guests)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            // ValueObject: TimeOfDayRange
            modelBuilder.Entity<ScheduleBlock>(entity =>
            {
                entity.OwnsOne(b => b.Range, range =>
                {
                    range.Property(r => r.Start)
                        .HasConversion(
                            v => v.ToString("HH:mm"),
                            v => TimeOnly.Parse(v))
                        .HasColumnName("StartTime");

                    range.Property(r => r.End)
                        .HasConversion(
                            v => v.ToString("HH:mm"),
                            v => TimeOnly.Parse(v))
                        .HasColumnName("EndTime");
                });
            });

            modelBuilder.Entity<ScheduleBlock>()
                .Property(b => b.Title)
                .IsRequired();

            modelBuilder.Entity<ScheduleBlock>()
                .Property(b => b.Studio)
                .HasConversion<int>();
        }
    }
}
