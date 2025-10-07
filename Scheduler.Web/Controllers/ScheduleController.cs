using Microsoft.AspNetCore.Mvc;
using Scheduler.Application;
using Scheduler.Web.Dtos;
using Scheduler.Domain.ValueObjects;
using Scheduler.Domain.Entities;

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

        // Räknare för att ge unika IDs till presenters och guests
        private static int _nextPresenterId = 1;
        private static int _nextGuestId = 1;


        // Endpoint för GET /api/schedule/all
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var days = SevenDaysService.GetAllDays();

            // Mappa varje dag till ScheduleDayDto
            var result = days.Select(day => new ScheduleDayDto
            {
                Date = day.Date.ToString("yyyy-MM-dd"),
                Blocks = day.Blocks.Select(block => new ScheduleBlockDto
                {
                    Id = block.Id,
                    Date = day.Date.ToString("yyyy-MM-dd"),
                    StartTime = block.Range.Start.ToString("HH:mm"),
                    EndTime = block.Range.End.ToString("HH:mm"),
                    Title = block.Title,
                    Studio = block.Studio.ToString(),
                    Presenters = block.Presenters,
                    Guests = block.Guests
                }).ToList()
            }).ToList();

            return Ok(result);
        }


        // Endpoint för GET /api/schedule/today
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
                Studio = block.Studio.ToString(),
                Presenters = block.Presenters,
                Guests = block.Guests
            }).ToList();

            return Ok(result);
        }


        // Endpoint för GET /api/schedule/week
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
                    Studio = block.Studio.ToString(),
                    Presenters = block.Presenters,
                    Guests = block.Guests
                }).ToList()
            });

            return Ok(result);
        }

        // Endpoint för GET /api/schedule/{id}
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
                Studio = block.Studio.ToString(),
                Presenters = block.Presenters,
                Guests = block.Guests
            };

            return Ok(result);
        }

        // Endpoint för POST /api/schedule/block
        [HttpPost("block")]
        public IActionResult CreateBlock([FromBody] ScheduleBlockDto blockDto)
        {
            try
            {
                // Konvertera DTO-värden till domänens typer
                var date = DateOnly.Parse(blockDto.Date);
                var start = TimeOnly.Parse(blockDto.StartTime);
                var end = TimeOnly.Parse(blockDto.EndTime);
                var title = blockDto.Title;
                var studio = Enum.Parse<Studio>(blockDto.Studio);

                // Skapa blocket via applikationslagret
                var block = SevenDaysService.AddBlock(date, start, end, title, studio);

                // Mappa tillbaka till DTO för svaret
                var result = new ScheduleBlockDto
                {
                    Id = block.Id,
                    Date = date.ToString("yyyy-MM-dd"),
                    StartTime = start.ToString("HH:mm"),
                    EndTime = end.ToString("HH:mm"),
                    Title = title,
                    Studio = studio.ToString(),
                    Presenters = block.Presenters,
                    Guests = block.Guests
                };

                // Returnera 201 Created med blocket
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

        // Endpoint för DELETE /api/schedule/block/{id}
        [HttpDelete("block/{id}")]
        public IActionResult DeleteBlock(int id)
        {
            var posts = SevenDaysService.GetAllDays();

            var block = posts.SelectMany(d => d.Blocks).FirstOrDefault(b => b.Id == id);

            if (block == null)
            {
                return NotFound();
            }
            var day = posts.FirstOrDefault(d => d.Blocks.Contains(block));
            if (day != null)
            {
                day.Blocks.Remove(block);
            }

            return NoContent();
        }

        // Endpoint för PUT /api/schedule/block/{id}
        [HttpPut("block/{id}")]
        public IActionResult UpdateBlock(int id, [FromBody] ScheduleBlockDto blockDto)
        {
            var days = SevenDaysService.GetAllDays();
            var post = days.SelectMany(d => d.Blocks).FirstOrDefault(b => b.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            var day = days.FirstOrDefault(d => d.Blocks.Contains(post));
            if (day == null)
            {
                return NotFound();
            }

            // Skapa nytt intervall – här fångas fel om sluttiden <= starttiden
            var newRange = new TimeOfDayRange(
                TimeOnly.Parse(blockDto.StartTime),
                TimeOnly.Parse(blockDto.EndTime)
            );

            // Kontrollera krockar mot andra block samma dag
            foreach (var existing in day.Blocks)
            {
                if (existing.Id != post.Id) // ignorera blocket självt
                {
                    if (newRange.Start < existing.Range.End && existing.Range.Start < newRange.End)
                    {
                        return Conflict(new { error = $"Block overlaps with existing block {existing.Range.Start} - {existing.Range.End}." });
                    }
                }
            }

            // Validera Studio
            var studio = Enum.Parse<Studio>(blockDto.Studio);
            if (studio == Studio.Unknown)
            {
                return BadRequest(new { error = "Studio cannot be Unknown" });
            }

            // Uppdatera blocket
            post.Title = blockDto.Title;
            post.Range = newRange;
            post.Studio = studio;

            // Mappa till DTO för svaret
            var result = new ScheduleBlockDto
            {
                Id = post.Id,
                Date = day.Date.ToString("yyyy-MM-dd"),
                StartTime = post.Range.Start.ToString("HH:mm"),
                EndTime = post.Range.End.ToString("HH:mm"),
                Title = post.Title,
                Studio = post.Studio.ToString()
            };

            return Ok(result);
        }

        // Endpoint för POST /api/schedule/block/{id}/presenter
        [HttpPost("block/{id}/presenter")]
        public IActionResult AddPresenter(int id, [FromBody] AddPresenterDto presenterDto)
        {
            var days = SevenDaysService.GetAllDays();
            var block = days.SelectMany(d => d.Blocks).FirstOrDefault(b => b.Id == id);

            if (block == null)
            {
                return NotFound();
            }

            if (string.IsNullOrWhiteSpace(presenterDto.Name))
            {
                return BadRequest(new { error = "Presenter name cannot be empty" });
            }
            var presenter = new Presenter
            {
                Id = _nextPresenterId++,
                Name = presenterDto.Name
            };

            block.Presenters.Add(presenter);

            // Mappa tillbaka till DTO
            var result = new ScheduleBlockDto
            {
                Id = block.Id,
                Date = days.First(d => d.Blocks.Contains(block)).Date.ToString("yyyy-MM-dd"),
                StartTime = block.Range.Start.ToString("HH:mm"),
                EndTime = block.Range.End.ToString("HH:mm"),
                Title = block.Title,
                Studio = block.Studio.ToString(),
                Presenters = block.Presenters,
                Guests = block.Guests
            };

            return Ok(result);
        }

        // Endpoint för POST /api/schedule/block/{id}/guests
        [HttpPost("block/{id}/guest")]
        public IActionResult AddGuests(int id, [FromBody] AddGuestsDto guestsDto)
        {
            var days = SevenDaysService.GetAllDays();
            var block = days.SelectMany(d => d.Blocks).FirstOrDefault(b => b.Id == id);

            if (block == null)
            {
                return NotFound();
            }

            if (guestsDto.Guests == null || !guestsDto.Guests.Any())
            {
                return BadRequest(new { error = "Guests cannot be empty" });
            }

            foreach (var name in guestsDto.Guests)
            {
                block.Guests.Add(new Guest(name));
            }

            // Mappa tillbaka till DTO
            var result = new ScheduleBlockDto
            {
                Id = block.Id,
                Date = days.First(d => d.Blocks.Contains(block)).Date.ToString("yyyy-MM-dd"),
                StartTime = block.Range.Start.ToString("HH:mm"),
                EndTime = block.Range.End.ToString("HH:mm"),
                Title = block.Title,
                Studio = block.Studio.ToString(),
                Presenters = block.Presenters,
                Guests = block.Guests
            };

            return Ok(result);
        }

        [HttpDelete("block/{id}/presenter/{presenterId}")]
        public IActionResult DeletePresenter(int id, int presenterId)
        {
            var days = SevenDaysService.GetAllDays();
            var block = days.SelectMany(d => d.Blocks).FirstOrDefault(b => b.Id == id);

            if (block == null)
            {
                return NotFound(new { error = $"Block with id {id} not found" });
            }

            var presenter = block.Presenters.FirstOrDefault(p => p.Id == presenterId);
            if (presenter == null)
            {
                return NotFound(new { error = $"Presenter with id {presenterId} not found" });
            }

            block.Presenters.Remove(presenter);

            return NoContent();
        }

        [HttpDelete("block/{id}/guest/{guestId}")]
        public IActionResult DeleteGuest(int id, int guestId)
        {
            var days = SevenDaysService.GetAllDays();
            var block = days.SelectMany(d => d.Blocks).FirstOrDefault(b => b.Id == id);

            if (block == null)
            {
                return NotFound(new { error = $"Block with id {id} not found" });
            }

            var guest = block.Guests.FirstOrDefault(g => g.Id == guestId);
            if (guest == null)
            {
                return NotFound(new { error = $"Guest with id {guestId} not found" });
            }

            block.Guests.Remove(guest);

            return NoContent();
        }   
    }
}
