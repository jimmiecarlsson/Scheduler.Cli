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
        //if (_days == null)
        //{
        //    _days = SeedDays(startDate);
        //}

        return _days;
    }

    public static List<ScheduleDay> GetAllDays()
    {
        //if (_days == null)
        //{
        //    _days = SeedDays(DateOnly.FromDateTime(DateTime.Today));
        //}

        return _days;
    }


    // 3️⃣ Hjälpmetod för seed-data
    //private static List<ScheduleDay> SeedDays(DateOnly startDate)
    //{
    //    var days = new List<ScheduleDay>();

    //    // Skapa en dag (idag)
    //    var date = startDate;
    //    var day = new ScheduleDay(date);

    //    // Lägg till ett block 08:00–09:00
    //    var range = new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(9, 0));
    //    var block = new ScheduleBlock(range, "Morgonpass", Studio.Studio1, 1);
    //    day.AddBlock(block);

    //    days.Add(day);

    //    return days;
    //}

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
        var block = new ScheduleBlock(range, title, studio);
        day.AddBlock(block);

        return block;
    }
}
