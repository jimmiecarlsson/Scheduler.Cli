using Scheduler.Cli.Application;

Console.WriteLine("Scheduler started...");

// Calling Application
var scheduler = new SchedulerService();
scheduler.Run();

//new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(14, 0));

Console.ReadLine();



Console.WriteLine("Scheduler finished.");

Console.ReadLine();
