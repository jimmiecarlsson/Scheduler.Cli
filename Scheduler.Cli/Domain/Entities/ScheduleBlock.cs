using System;
using Scheduler.Cli.Domain.ValueObjects;

namespace Scheduler.Cli.Domain.Entities
{
    public class ScheduleBlock
    {
        public TimeOfDayRange Range { get; }
        public object Content { get; }
        
        public ScheduleBlock(TimeOfDayRange range, object content) 
        {
            if(content == null) throw new ArgumentNullException("Content is null");

            if(range == null) throw new ArgumentNullException(nameof(range));

            Range = range;
            Content = content;
        }

    }
}
