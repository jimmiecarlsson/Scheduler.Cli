namespace Scheduler.Web.Dtos
{
    public class CreatePlaylistDto
    {
        public string Title { get; set; } = string.Empty;

        public string Artist { get; set; } = string.Empty;

        public int DurationSeconds { get; set; }
    }
}
