using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Domain.Entities;
using Scheduler.Web.Data;
using Scheduler.Web.Dtos;

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

        [HttpGet("next")]
        public IActionResult GetNext()
        {
            var playlists = _db.Playlists
                .OrderBy(p => p.Id)
                .ToList();

            if (!playlists.Any())
                return NoContent();

            // Om inget spelas ännu, visa första
            if (_currentIndex < 0)
            {
                var first = playlists[0];
                return Ok(new
                {
                    first.Id,
                    first.Title,
                    first.Artist,
                    first.DurationSeconds
                });
            }

            var nextIndex = _currentIndex + 1;
            if (nextIndex >= playlists.Count)
                nextIndex = 0;

            var next = playlists[nextIndex];

            return Ok(new
            {
                next.Id,
                next.Title,
                next.Artist,
                next.DurationSeconds
            });
        }


        // POST /api/playlist
        [Authorize(Roles = "Contributor")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePlaylistDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { error = "Title is required" });

            if (string.IsNullOrWhiteSpace(dto.Artist))
                return BadRequest(new { error = "Artist is required" });

            if (dto.DurationSeconds <= 0)
                return BadRequest(new { error = "DurationSeconds must be > 0" });

            var song = new Playlist(
                dto.Title.Trim(),
                dto.Artist.Trim(),
                dto.DurationSeconds
            );

            _db.Playlists.Add(song);
            await _db.SaveChangesAsync();

            return CreatedAtAction(
                actionName: nameof(Create),
                routeValues: new { id = song.Id },
                value: new
                {
                    song.Id,
                    song.Title,
                    song.Artist,
                    song.DurationSeconds
                }
            );
        }

        [Authorize(Roles = "Contributor")]
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var songs = _db.Playlists
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Artist,
                    p.DurationSeconds
                })
                .ToList();

            return Ok(songs);
        }





    }
}
