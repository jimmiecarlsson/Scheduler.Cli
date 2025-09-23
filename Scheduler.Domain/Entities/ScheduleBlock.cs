using Scheduler.Domain.ValueObjects;

namespace Scheduler.Domain.Entities
{
    public class ScheduleBlock
    {
        public TimeOfDayRange Range { get; set; }
        public string Title { get; set; }

        public Studio Studio { get; set; }

        public int Id { get; set; }

        public List<Presenter> Presenters { get; set; } = new();
        public List<Guest> Guests { get; set; } = new();

        public ScheduleBlock(TimeOfDayRange range, string title, Studio studio, int id)
        {
            if(range == null) throw new ArgumentNullException(nameof(range));
            if(string.IsNullOrWhiteSpace(title)) throw new ArgumentException("Title cannot be empty.", nameof(title));
            if (studio == Studio.Unknown) throw new ArgumentException("Studio cannot be Unknown", nameof(studio));
            if (id <= 0) throw new ArgumentException("Id cannot be <= 0", nameof(id));

            Id = id;
            Range = range;
            Title = title;
            Studio = studio;
        }

    }
}
