namespace Scheduler.Application;

using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;


public class SevenDaysService
{

    public static List<ScheduleDay> GetSevenDays(DateOnly startDate)
    { 
        var days = new List<ScheduleDay>();
        var nextId = 1;


        // Seed with some default data for demo purposes
        for (int i = 0; i < 7; i++)
        {
            var date = startDate.AddDays(i);
            var day = new ScheduleDay(date);

            var range = new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(9, 0));
            var block = new ScheduleBlock(range, "Morgonpass", Studio.Studio1, nextId++);
            day.AddBlock(block);

            days.Add(day);
        }

        // Seed with one block on day 3
        var Day3 = days[2];
        var RangeDay3 = new TimeOfDayRange(new TimeOnly(18, 0), new TimeOnly(20, 0));
        var BlockDay3 = new ScheduleBlock(RangeDay3, "Live session", Studio.Studio1, nextId++);
        Day3.AddBlock(BlockDay3);

        // Seed with one block on day 6
        var Day6 = days[5];
        var RangeDay6 = new TimeOfDayRange(new TimeOnly(0, 0), new TimeOnly(3, 0));
        var BlockDay6 = new ScheduleBlock(RangeDay6, "Jazz Night", Studio.Studio2, nextId++);
        Day6.AddBlock(BlockDay6);

        // Seed with one block on day 1
        var Day2 = days[0];
        var RangeDay2 = new TimeOfDayRange(new TimeOnly(0, 0), new TimeOnly(3, 0));
        var BlockDay2 = new ScheduleBlock(RangeDay2, "Jazz Night", Studio.Studio1, nextId++);
        Day2.AddBlock(BlockDay2);

        return days;

    }




}

