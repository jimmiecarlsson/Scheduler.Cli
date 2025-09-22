using Microsoft.AspNetCore.Mvc;
using Scheduler.Application;
using Scheduler.Web.Dtos;

namespace Scheduler.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        // 🔹 Fält (private property) – lagrar en referens till SevenDaysService
        private readonly SevenDaysService _SevenDaysService;

        // 🔹 Konstruktor – DI-containern skickar in SevenDaysService här
        public ScheduleController(SevenDaysService sevenDaysService)
        {
            _SevenDaysService = sevenDaysService;
        }

        // 🔹 Metod – endpoint för GET /api/schedule/today
        [HttpGet("today")]
        public IActionResult GetToday()
        {
            var days = SevenDaysService.GetSevenDays(DateOnly.FromDateTime(DateTime.Today));

            var today = days[0];

            var result = today.Blocks.Select(block => new ScheduleBlockDto
            {
                Date = today.Date.ToString("yyyy-MM-dd"),
                StartTime = block.Range.Start.ToString("HH:mm"),
                EndTime = block.Range.End.ToString("HH:mm"),
                Title = block.Title,
                Studio = block.Studio.ToString()
            }).ToList();

            return Ok(result);
        }

        // 🔹 Metod – endpoint för GET /api/schedule/week
        [HttpGet("week")]
        public IActionResult GetWeek()
        {
            var days = SevenDaysService.GetSevenDays(DateOnly.FromDateTime(DateTime.Today));

            var result = days.Select(day => new
            {
                Date = day.Date.ToString("yyyy-MM-dd"),
                Blocks = day.Blocks.Select(block => new ScheduleBlockDto
                {
                    Date = day.Date.ToString("yyyy-MM-dd"),
                    StartTime = block.Range.Start.ToString("HH:mm"),
                    EndTime = block.Range.End.ToString("HH:mm"),
                    Title = block.Title,
                    Studio = block.Studio.ToString()
                }).ToList()
            });

            return Ok(result);
        }

        // 🔹 Metod – endpoint för GET /api/schedule/{id}
        [HttpGet("{id}")]
        public IActionResult GetScheduleById(int id)
        {

         var days = SevenDaysService.GetSevenDays(DateOnly.FromDateTime(DateTime.Today));

            var block = days.SelectMany(d => d.Blocks).FirstOrDefault(b => b.Id == id);

            if (block == null)
            {
                return NotFound();
            }

            var result = new ScheduleBlockDto
            {
                Id = block.Id,
                Date = days.First(d => d.Blocks.Contains(block)).Date.ToString("yyyy-MM-dd"),
                StartTime = block.Range.Start.ToString("HH:mm"),
                EndTime = block.Range.End.ToString("HH:mm"),
                Title = block.Title,
                Studio = block.Studio.ToString()
            };

            return Ok(result);
        }
    }
}
