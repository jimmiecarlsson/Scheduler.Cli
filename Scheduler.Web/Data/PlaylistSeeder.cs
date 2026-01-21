using Scheduler.Domain.Entities;

namespace Scheduler.Web.Data
{
    public static class PlaylistSeeder
    {
        public static async Task SeedAsync(SchedulerDbContext db)
        {
            // Om det redan finns låtar – gör inget
            if (db.Playlists.Any())
                return;

            var songs = new List<Playlist>
            {
                new("Back in Black", "AC/DC", 255),
                new("The Trooper", "Iron Maiden", 245),
                new("Don't Stop Me Now", "Queen", 210),
                new("Enter Sandman", "Metallica", 331),
                new("Sweet Child O' Mine", "Guns N' Roses", 356),
                new("Run to the Hills", "Iron Maiden", 234),
                new("Highway to Hell", "AC/DC", 208),
                new("Jump", "Van Halen", 242),
                new("Pour Some Sugar on Me", "Def Leppard", 292),
                new("Paranoid", "Black Sabbath", 171),
                new("Rock You Like a Hurricane", "Scorpions", 255),
                new("Ace of Spades", "Motörhead", 168),
                new("Crazy Train", "Ozzy Osbourne", 294),
                new("Smoke on the Water", "Deep Purple", 340),
                new("The Final Countdown", "Europe", 308),
                new("Sultans of Swing", "Dire Straits", 350),
                new("Bohemian Rhapsody", "Queen", 354),
                new("Dreamer Deceiver", "Judas Priest", 327),
                new("Livin' on a Prayer", "Bon Jovi", 250),
                new("Rock and Roll All Nite", "Kiss", 215)
            };

            db.Playlists.AddRange(songs);
            await db.SaveChangesAsync();
        }
    }
}
