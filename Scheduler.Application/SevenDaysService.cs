namespace Scheduler.Application;

using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;

public class SevenDaysService
{
    // 1️⃣ Statisk lista som lever kvar i RAM
    private static List<ScheduleDay>? _days;
    private static int _nextId = 1;

    // 2️⃣ Hämtar alla dagar – om de inte finns, seedas de
    public static List<ScheduleDay> GetSevenDays(DateOnly startDate)
    {
        if (_days == null)
        {
            _days = SeedDays(startDate);
        }

        return _days;
    }

    // 3️⃣ Hjälpmetod för seed-data
    private static List<ScheduleDay> SeedDays(DateOnly startDate)
    {
        var days = new List<ScheduleDay>();

        for (int i = 0; i < 7; i++)
        {
            var date = startDate.AddDays(i);
            var day = new ScheduleDay(date);

            var range = new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(9, 0));
            var block = new ScheduleBlock(range, "Morgonpass", Studio.Studio1, _nextId++);
            day.AddBlock(block);

            days.Add(day);
        }

        // Några extra exempelblock
        var day3 = days[2];
        var rangeDay3 = new TimeOfDayRange(new TimeOnly(18, 0), new TimeOnly(20, 0));
        day3.AddBlock(new ScheduleBlock(rangeDay3, "Live session", Studio.Studio1, _nextId++));

        var day6 = days[5];
        var rangeDay6 = new TimeOfDayRange(new TimeOnly(0, 0), new TimeOnly(3, 0));
        day6.AddBlock(new ScheduleBlock(rangeDay6, "Jazz Night", Studio.Studio2, _nextId++));

        return days;
    }

    // 4️⃣ Ny metod för att skapa ett block
    public static ScheduleBlock AddBlock(DateOnly date, TimeOnly start, TimeOnly end, string title, Studio studio)
    {
        var days = GetSevenDays(date);

        var day = days.FirstOrDefault(d => d.Date == date);
        if (day == null)
        {
            day = new ScheduleDay(date);
            days.Add(day);
        }

        var range = new TimeOfDayRange(start, end);
        var block = new ScheduleBlock(range, title, studio, _nextId++);
        day.AddBlock(block);

        return block;
    }
}
