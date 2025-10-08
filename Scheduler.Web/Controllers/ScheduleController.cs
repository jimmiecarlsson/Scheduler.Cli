using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Scheduler.Application;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using Scheduler.Web.Data;
using Scheduler.Web.Dtos;

namespace Scheduler.Web.Controllers
{
    


    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly SchedulerDbContext _db;

        public ScheduleController(SchedulerDbContext db)
        {
            _db = db;
        }



        // 🔹 Fält (private property) – lagrar en referens till SevenDaysService
        private readonly SevenDaysService _SevenDaysService;

        // Räknare för att ge unika IDs till presenters och guests
        private static int _nextPresenterId = 1;
        private static int _nextGuestId = 1;


        // Endpoint för GET /api/schedule/all
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var days = _db.ScheduleDays
                .Include(d => d.Blocks)
                    .ThenInclude(b => b.Presenters)
                .Include(d => d.Blocks)
                    .ThenInclude(b => b.Guests)
                .ToList();

            return Ok(days);
        }


        // Endpoint för GET /api/schedule/today
        [HttpGet("today")]
        public IActionResult GetToday()
        {
            var todayDate = DateOnly.FromDateTime(DateTime.Today);

            // 🔹 Hämta dagen från databasen inklusive relationsdata
            var today = _db.ScheduleDays
                .Include(d => d.Blocks)
                    .ThenInclude(b => b.Presenters)
                .Include(d => d.Blocks)
                    .ThenInclude(b => b.Guests)
                .FirstOrDefault(d => d.Date == todayDate);

            // 🔹 Om inget schema finns för idag – returnera tom lista
            if (today == null)
            {
                return Ok(new List<ScheduleBlockDto>());
            }

            // 🔹 Mappa till DTO
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
            var startDate = DateOnly.FromDateTime(DateTime.Today);
            var endDate = startDate.AddDays(7);

            // 🔹 Hämta alla dagar från idag och en vecka framåt
            var days = _db.ScheduleDays
                .Include(d => d.Blocks)
                    .ThenInclude(b => b.Presenters)
                .Include(d => d.Blocks)
                    .ThenInclude(b => b.Guests)
                .Where(d => d.Date >= startDate && d.Date < endDate)
                .OrderBy(d => d.Date)
                .ToList();

            // 🔹 Mappa till DTO
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
            // Hämta blocket inklusive relationer
            var block = _db.ScheduleBlocks
                .Include(b => b.Presenters)
                .Include(b => b.Guests)
                .Include(b => b.Range) // om Range är en egen typ (annars kan detta tas bort)
                .FirstOrDefault(b => b.Id == id);

            if (block == null)
            {
                return NotFound();
            }

            // Hämta vilken dag blocket tillhör (enbart om du behöver Date)
            var day = _db.ScheduleDays
                .Include(d => d.Blocks)
                .FirstOrDefault(d => d.Blocks.Contains(block));

            var date = day != null ? day.Date : DateOnly.MinValue;

            // Mappa till DTO
            var result = new ScheduleBlockDto
            {
                Id = block.Id,
                Date = date.ToString("yyyy-MM-dd"),
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
                // 🔹 Konvertera inkommande värden
                var date = DateOnly.Parse(blockDto.Date);
                var start = TimeOnly.Parse(blockDto.StartTime);
                var end = TimeOnly.Parse(blockDto.EndTime);
                var title = blockDto.Title;
                var studio = Enum.Parse<Studio>(blockDto.Studio);

                // 🔹 Hämta eller skapa dagen
                var day = _db.ScheduleDays
                    .Include(d => d.Blocks)
                    .FirstOrDefault(d => d.Date == date);

                if (day == null)
                {
                    day = new ScheduleDay(date);
                    _db.ScheduleDays.Add(day);
                }

                // 🔹 Skapa blocket
                var range = new TimeOfDayRange(start, end);
                var block = new ScheduleBlock(range, title, studio);

                // 🔹 Lägg till blocket via domänlogiken
                day.AddBlock(block);

                // 🔹 Spara till databasen
                _db.SaveChanges();

                // 🔹 Mappa till DTO
                var result = new ScheduleBlockDto
                {
                    Id = block.Id,
                    Date = day.Date.ToString("yyyy-MM-dd"),
                    StartTime = start.ToString("HH:mm"),
                    EndTime = end.ToString("HH:mm"),
                    Title = title,
                    Studio = studio.ToString(),
                    //Presenters = block.Presenters,
                    //Guests = block.Guests
                };

                // 🔹 Returnera Created (201)
                return CreatedAtAction(nameof(GetScheduleById), new { id = block.Id }, result);
            }
            catch (ArgumentException ex)
            {
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // Endpoint för PUT /api/schedule/block/{id}
        [HttpPut("block/{id}")]
        public IActionResult UpdateBlock(int id, [FromBody] ScheduleBlockDto blockDto)
        {
            try
            {
                // Hitta rätt dag med sina block
                var day = _db.ScheduleDays
                    .Include(d => d.Blocks)
                    .FirstOrDefault(d => d.Blocks.Any(b => b.Id == id));

                if (day == null)
                    return NotFound(new { error = $"Block med ID {id} hittades inte." });

                // Hitta blocket
                var block = day.Blocks.FirstOrDefault(b => b.Id == id);
                if (block == null)
                    return NotFound(new { error = $"Block med ID {id} hittades inte." });

                // Uppdatera värden
                var newRange = new TimeOfDayRange(
                    TimeOnly.Parse(blockDto.StartTime),
                    TimeOnly.Parse(blockDto.EndTime)
                );

                block.Update(newRange, blockDto.Title, Enum.Parse<Studio>(blockDto.Studio));

                // Spara i databasen
                _db.SaveChanges();

                // Returnera uppdaterad DTO
                var result = new ScheduleBlockDto
                {
                    Id = block.Id,
                    Date = day.Date.ToString("yyyy-MM-dd"),
                    StartTime = block.Range.Start.ToString("HH:mm"),
                    EndTime = block.Range.End.ToString("HH:mm"),
                    Title = block.Title,
                    Studio = block.Studio.ToString()
                };

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }


        // Endpoint för POST /api/schedule/block/{id}/presenter
        [HttpPost("block/{id}/presenter")]
        public IActionResult AddPresenter(int id, [FromBody] AddPresenterDto presenterDto)
        {
            if (string.IsNullOrWhiteSpace(presenterDto.Name))
                return BadRequest(new { error = "Presenter name cannot be empty" });

            // 🔹 Hämta blocket inklusive presenters och guests
            var block = _db.ScheduleBlocks
                .Include(b => b.Presenters)
                .Include(b => b.Guests)
                .FirstOrDefault(b => b.Id == id);

            if (block == null)
                return NotFound(new { error = $"Block with id {id} not found" });

            // 🔹 Skapa ny presenter och lägg till i listan
            var presenter = new Presenter { Name = presenterDto.Name };
            block.Presenters.Add(presenter);

            // 🔹 Spara till databasen
            _db.SaveChanges();

            // 🔹 Hämta dagen för att kunna returnera datum
            var day = _db.ScheduleDays
                .Include(d => d.Blocks)
                .FirstOrDefault(d => d.Blocks.Any(b => b.Id == id));

            var date = day?.Date.ToString("yyyy-MM-dd") ?? string.Empty;

            // 🔹 Mappa till DTO
            var result = new ScheduleBlockDto
            {
                Id = block.Id,
                Date = date,
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
            // 🔹 Validera input
            if (guestsDto.Guests == null || !guestsDto.Guests.Any())
                return BadRequest(new { error = "Guests cannot be empty" });

            // 🔹 Hämta blocket från databasen inklusive presenters och guests
            var block = _db.ScheduleBlocks
                .Include(b => b.Presenters)
                .Include(b => b.Guests)
                .FirstOrDefault(b => b.Id == id);

            if (block == null)
                return NotFound(new { error = $"Block with id {id} not found" });

            // 🔹 Lägg till varje gäst
            foreach (var name in guestsDto.Guests)
            {
                if (!string.IsNullOrWhiteSpace(name))
                {
                    block.Guests.Add(new Guest(name));
                }
            }

            // 🔹 Spara till databasen
            _db.SaveChanges();

            // 🔹 Hämta dagen blocket tillhör (för att kunna sätta Date i svaret)
            var day = _db.ScheduleDays
                .Include(d => d.Blocks)
                .FirstOrDefault(d => d.Blocks.Any(b => b.Id == id));

            var date = day?.Date.ToString("yyyy-MM-dd") ?? string.Empty;

            // 🔹 Mappa tillbaka till DTO
            var result = new ScheduleBlockDto
            {
                Id = block.Id,
                Date = date,
                StartTime = block.Range.Start.ToString("HH:mm"),
                EndTime = block.Range.End.ToString("HH:mm"),
                Title = block.Title,
                Studio = block.Studio.ToString(),
                Presenters = block.Presenters,
                Guests = block.Guests
            };

            return Ok(result);
        }

        // Endpoint för DELETE /api/schedule/block/{id}
        [HttpDelete("block/{id}")]
        public IActionResult DeleteBlock(int id)
        {
            try
            {
                // Hitta rätt dag och inkludera blocken

                var day = _db.ScheduleDays
                    .Include(d => d.Blocks)
                    .FirstOrDefault(d => d.Id == id);

                if(day == null) return NotFound(new { error = $"Block Id {id} hittades inte.(1)" });

                var block = day.Blocks
                    .FirstOrDefault(b => b.Id == id);

                if (block == null) return NotFound(new { error = $"Block id {id} hittades inte.(2)" });

                day.RemoveBlock(block);

                _db.SaveChanges();
               
                return Ok(new { message = $"Block {id} har tagit bort."});
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }

        }


        [HttpDelete("block/{id}/presenter/{presenterId}")]
        public IActionResult DeletePresenter(int id, int presenterId)
        {
            try
            {
                var block = _db.ScheduleBlocks
                    .Include(d => d.Presenters)
                    .FirstOrDefault(d => d.Id==id);

                if (block == null) return NotFound(new {error = $"Block Id {id} hittades inte" });

                var presenter = block.Presenters.FirstOrDefault(d => d.Id== presenterId);

                if (presenter == null) return NotFound(new { error = $"Presenter Id {presenterId} hittades inte i block {id}" }); 

                block.Presenters.Remove(presenter);
                _db.SaveChanges();

                return Ok(new { message = $"Presenter {presenterId} togs bort från block {id}" });
            }
            catch (Exception ex)
            { 
                return BadRequest(new {error = ex.Message});
            }
        }


        [HttpDelete("block/{id}/guest/{guestId}")]
        public IActionResult DeleteGuest(int id, int guestId)
        {
            try
            {
                var block = _db.ScheduleBlocks
                .Include(b => b.Guests)
                .FirstOrDefault(b => b.Id == id);

                if (block == null)
                    return NotFound(new { error = $"Block id {id} hittades inte." });

                var guest = block.Guests
                    .FirstOrDefault(g => g.Id == guestId);

                if (guest == null)
                    return NotFound(new { error = $"Gäst id {guestId} hittades inte i block {id}." });

                block.Guests.Remove(guest);
                _db.SaveChanges();

                return Ok(new { message = $"Gäst {guestId} togs bort från block {id}."});
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message});
            }
        }

    }
}
