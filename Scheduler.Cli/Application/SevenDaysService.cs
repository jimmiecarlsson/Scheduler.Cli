namespace Scheduler.Application;

using Scheduler.Cli.Domain.Entities;
using System;
using System.Collections.Generic;


public class SevenDaysService
{

    public static List<ScheduleDay> GetSevenDays(DateOnly startDate)
    { 
        var days = new List<ScheduleDay>();

        for (int i = 0; i < 7; i++)
        {
            var date = startDate.AddDays(i);
            var day = new ScheduleDay(date);
            days.Add(day);
        }

        return days;

    }


}

