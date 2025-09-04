using System;
using System.Collections.Generic;
using Scheduler.Cli.Application;
using Scheduler.Cli.Domain.Entities;
using Scheduler.Cli.Domain.ValueObjects;

Console.WriteLine("Scheduler running...");

var today = DateOnly.FromDateTime(DateTime.Today);

// Get the next seven days starting from today
var week = SevenDaysService.GetSevenDays(today);

// Seed some test data
SeedTestData(week);

// Print the full week schedule
PrintWeek(week);


Console.WriteLine("Scheduler finished.");
Console.ReadLine();

// Help method to seed test data
static void SeedTestData(List<ScheduleDay> days)
{
    // Add some blocks to each day
    foreach (var day in days)
    {
        var morning = new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(9, 0));
        day.AddBlock(new ScheduleBlock(morning, "Morgonpass", Studio.Studio1));

        var afternoon = new TimeOfDayRange(new TimeOnly(14, 0), new TimeOnly(15, 0));
        day.AddBlock(new ScheduleBlock(afternoon, "Eftermiddagspass", Studio.Studio2));
    }

    // Add 2 single special 
    var specialDay = days[2];
    var special = new TimeOfDayRange(new TimeOnly(18, 0), new TimeOnly(20, 0));

    specialDay.AddBlock(new ScheduleBlock(special, "Live session", Studio.Studio2));

    var anotherSpecialDay = days[5];
    var anotherSpecial = new TimeOfDayRange(new TimeOnly(0, 0), new TimeOnly(3, 0));

    anotherSpecialDay.AddBlock(new ScheduleBlock(anotherSpecial, "Live session", Studio.Studio1));
}

// Print a full week schedule with gaps filled with "Musik"
static void PrintWeek(List<ScheduleDay> days)
{
    foreach (var d in days)
    {
        PrintDay(d);
        Console.WriteLine();
    }
}

// Print a single day schedule with gaps filled with "Musik"
static void PrintDay(ScheduleDay day)
{
    Console.WriteLine($"Schema för {day.Date}:");

    var blocks = day.Blocks
        .OrderBy(b => b.Range.Start)
        .ToList();

    var cursor = new TimeOnly(0, 0);           // 00:00
    var endOfDay = new TimeOnly(23, 59, 59);   // almost 24:00

    foreach (var b in blocks)
    {
        if (cursor < b.Range.Start)
            Console.WriteLine($"{cursor:HH\\:mm}–{b.Range.Start:HH\\:mm}  Musik");

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine($"{b.Range.Start:HH\\:mm}–{b.Range.End:HH\\:mm}  {b.Title} ({b.Studio})");
        cursor = b.Range.End;
        Console.ResetColor();
    }

    if (cursor < endOfDay)
        Console.WriteLine($"{cursor:HH\\:mm}–24:00  Musik");
}

