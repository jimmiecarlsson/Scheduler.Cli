using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Entities
{
    public class Playlist
    {
        public int Id { get; private set; }

        public string Title { get; private set; } = string.Empty;
        public string Artist { get; private set; } = string.Empty;

        public int DurationSeconds { get; private set; }

        private Playlist() { }

        public Playlist(string title, string artist, int durationSeconds)
        {

            if (string.IsNullOrEmpty(title)) 
                throw new ArgumentNullException("Title is required", nameof(title));

            if (string.IsNullOrEmpty(artist))
                   throw new ArgumentNullException("Artist is required", nameof(artist));

            if (durationSeconds <= 0)
                throw new ArgumentOutOfRangeException(nameof(durationSeconds), "Duration must be > 0");

            Title = title;
            Artist = artist;
            DurationSeconds = durationSeconds;
        }
    }
}
