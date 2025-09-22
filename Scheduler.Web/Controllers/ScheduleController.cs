using Microsoft.AspNetCore.Mvc;
using Scheduler.Application;
using Scheduler.Web.Dtos;
using Scheduler.Domain.ValueObjects;

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
                Id = block.Id,
                Date = today.Date.ToString("yyyy-MM-dd"),
                StartTime = block.Range.Start.ToString("HH:mm"),
                EndTime = block.Range.End.ToString("HH:mm"),
                Title = block.Title,
                Studio = block.Studio.ToString()
            }).ToList();

            return Ok(result);
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var days = SevenDaysService.GetAllDays();

            // mappar dagarna och deras block till DTO:er (precis som i /week)
            var result = days.Select(day => new
            {
                date = day.Date.ToString("yyyy-MM-dd"),
                blocks = day.Blocks.Select(block => new ScheduleBlockDto
                {
                    Id = block.Id,
                    Date = day.Date.ToString("yyyy-MM-dd"),
                    StartTime = block.Range.Start.ToString("HH:mm"),
                    EndTime = block.Range.End.ToString("HH:mm"),
                    Title = block.Title,
                    Studio = block.Studio.ToString()
                }).ToList()
            });

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
                    Id = block.Id,
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

        // 🔹 Metod – endpoint för POST /api/schedule/block
        [HttpPost("block")]
        public IActionResult CreateBlock([FromBody] ScheduleBlockDto blockDto)
        {
            try
            {
                // 1️⃣ Konvertera DTO-värden till domänens typer
                var date = DateOnly.Parse(blockDto.Date);
                var start = TimeOnly.Parse(blockDto.StartTime);
                var end = TimeOnly.Parse(blockDto.EndTime);
                var title = blockDto.Title;
                var studio = Enum.Parse<Studio>(blockDto.Studio);

                // 2️⃣ Skapa blocket via applikationslagret
                var block = SevenDaysService.AddBlock(date, start, end, title, studio);

                // 3️⃣ Mappa tillbaka till DTO för svaret
                var result = new ScheduleBlockDto
                {
                    Id = block.Id,
                    Date = date.ToString("yyyy-MM-dd"),
                    StartTime = start.ToString("HH:mm"),
                    EndTime = end.ToString("HH:mm"),
                    Title = title,
                    Studio = studio.ToString()
                };

                // 4️⃣ Returnera 201 Created med blocket
                return CreatedAtAction(nameof(GetScheduleById), new { id = block.Id }, result);
            }
            catch (ArgumentException ex)
            {
                // T.ex. tidskrock eller ogiltig studio
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                // Något annat gick snett
                return BadRequest(new { error = ex.Message });
            }
        }

        // 🔹 Metod – endpoint för DELETE /api/schedule/block/{id}
        [HttpDelete("block/{id}")]
        public IActionResult DeleteBlock(int id)
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
