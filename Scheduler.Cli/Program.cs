using Scheduler.Cli.Application;
using Scheduler.Cli.Domain.Entities;
using Scheduler.Cli.Domain.ValueObjects;

Console.WriteLine("Scheduler started...");

// Calling Application
var scheduler = new SchedulerService();
scheduler.Run();

// *** Testing area ***


//new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(14, 0));

var today = DateOnly.FromDateTime(DateTime.Today);

var day = new ScheduleDay(today);

// Skapa ett tidsintervall
var range1 = new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(9, 0));
var range2 = new TimeOfDayRange(new TimeOnly(8, 59), new TimeOnly(9, 5));

// Skapa ett block
var block1 = new ScheduleBlock(range1, "Morgonmusik");
var block2 = new ScheduleBlock(range2, "Nyheter");

// Lägg till blocket
day.AddBlock(block1);
day.AddBlock(block2);

Console.WriteLine($"Block tillagt: {block1.Range.Start}–{block1.Range.End}, {block1.Content}");
Console.WriteLine($"Block tillagt: {block2.Range.Start}–{block2.Range.End}, {block2.Content}");












// *** Testing area ends ***

Console.ReadLine();



Console.WriteLine("Scheduler finished.");

Console.ReadLine();
