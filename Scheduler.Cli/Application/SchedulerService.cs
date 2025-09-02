namespace Scheduler.Cli.Application;

using Scheduler.Cli.Domain.Entities;
using Scheduler.Cli.Domain.ValueObjects;
using System;




    public class SchedulerService
    {
        public void Run()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);

            var day = new ScheduleDay(today);

            var range1 = new TimeOfDayRange(new TimeOnly(8, 0), new TimeOnly(9, 0));
            var block1 = new ScheduleBlock(range1, "Morgonmusik");
            day.AddBlock(block1);

            var pass2 = new TimeOfDayRange(new TimeOnly(14, 0), new TimeOnly(16, 0));
            var block2 = new ScheduleBlock(pass2, "Reportage");
            day.AddBlock(block2);

            var blocks = day.Blocks
                .OrderBy(b => b.Range.Start)
                .ToList();

            var cursor = new TimeOnly(0, 0); // 00:00
            var endOfDay = new TimeOnly(23, 59, 59);

            Console.WriteLine($"Schema för {day.Date}:");

            blocks.ForEach(b =>
            {
                if (cursor < b.Range.Start)
                    Console.WriteLine($"{cursor:HH\\:mm}–{b.Range.Start:HH\\:mm}  Musik");
                

                Console.WriteLine($"{b.Range.Start:HH\\:mm}–{b.Range.End:HH\\:mm}  {b.Content}");

                cursor = b.Range.End;
            });

            if (cursor < endOfDay)
                Console.WriteLine($"{cursor:HH\\:mm}–24:00  Musik");
            
        }
    }
