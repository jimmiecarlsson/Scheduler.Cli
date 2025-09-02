using System;
using Scheduler.Cli.Domain.ValueObjects;

namespace Scheduler.Cli.Domain.Entities
{
    public class ScheduleBlock
    {
        public TimeOfDayRange Range { get; }
        public string Title { get; }

        public Studio Studio { get; }

        public ScheduleBlock(TimeOfDayRange range, string title, Studio studio)
        {
            if(range == null) throw new ArgumentNullException(nameof(range));
            if(string.IsNullOrWhiteSpace(title)) throw new ArgumentException("Title cannot be empty.", nameof(title));
            if (studio == Studio.Unknown) throw new ArgumentException("Studio cannot be Unknown", nameof(studio));

            Range = range;
            Title = title;
            Studio = studio;
            
        }

    }
}
