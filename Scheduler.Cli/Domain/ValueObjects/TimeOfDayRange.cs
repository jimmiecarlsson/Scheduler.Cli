namespace Scheduler.Cli.Domain.ValueObjects;
using System;
public class TimeOfDayRange
{
    public TimeOnly Start { get; }
    public TimeOnly End { get; }

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

            Console.WriteLine($"Start: {Start} End: {End}");
        }


    }

    public TimeSpan Duration => End.ToTimeSpan() - Start.ToTimeSpan();
}