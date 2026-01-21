using Microsoft.AspNetCore.Mvc;
using Scheduler.Web.Data;
using Scheduler.Domain.Entities;

namespace Scheduler.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistController : ControllerBase
    {
        private readonly SchedulerDbContext _db;

        // Runtime
        private static int _currentIndex = -1;
        private static DateTime _currentSongEndsAt = DateTime.MinValue;
        private static Playlist? _currentSong;

        public PlaylistController(SchedulerDbContext db)
        {
            _db = db;
        }

        
        [HttpGet("current")]
        public IActionResult GetCurrent()
        {
            var playlists = _db.Playlists
                .OrderBy(p => p.Id)
                .ToList();

            if (!playlists.Any())
                return NoContent();

            var now = DateTime.UtcNow;

            // Om ingen låt spelas eller om tiden gått ut → välj nästa
            if (_currentSong == null || now >= _currentSongEndsAt)
            {
                _currentIndex++;

                if (_currentIndex >= playlists.Count)
                    _currentIndex = 0;

                _currentSong = playlists[_currentIndex];
                _currentSongEndsAt = now.AddSeconds(_currentSong.DurationSeconds);
            }

            return Ok(new
            {
                _currentSong.Id,
                _currentSong.Title,
                _currentSong.Artist,
                _currentSong.DurationSeconds,
                EndsAtUtc = _currentSongEndsAt
            });
        }
    }
}
