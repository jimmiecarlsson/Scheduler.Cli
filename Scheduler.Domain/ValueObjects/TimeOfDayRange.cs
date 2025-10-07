namespace Scheduler.Domain.ValueObjects;
using System;
public class TimeOfDayRange
{
    public TimeOnly Start { get; private set; }
    public TimeOnly End { get; private set; }

    private TimeOfDayRange() { }

    public TimeOfDayRange(TimeOnly start, TimeOnly end)
    {
        if (end <= start)
        {
            throw new ArgumentException("End must be after Start");
        }
        else
        {
            Start = start;
            End = end;

        }
    }

    public TimeSpan Duration => End.ToTimeSpan() - Start.ToTimeSpan();
}