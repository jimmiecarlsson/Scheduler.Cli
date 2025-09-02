using Scheduler.Cli.Application;
internal class Program
{
    private static void Main(string[] args)
    {
        // Calling Application
        Console.WriteLine("Scheduler running...");
        var app = new SchedulerService();
        app.Run();
        Console.ReadLine();



        Console.WriteLine("Scheduler finished.");

        Console.ReadLine();
    }
}