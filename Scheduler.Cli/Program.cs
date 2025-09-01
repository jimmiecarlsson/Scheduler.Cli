using Scheduler.Cli.Application;




Console.WriteLine("Scheduler started...");

// Här kallar vi en placeholder i Application
var scheduler = new SchedulerService();
scheduler.Run();

Console.WriteLine("Scheduler finished.");

Console.ReadLine();
