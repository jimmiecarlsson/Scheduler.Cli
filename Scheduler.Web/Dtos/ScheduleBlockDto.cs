using Scheduler.Domain.ValueObjects;

namespace Scheduler.Web.Dtos
{
    public class ScheduleBlockDto
    {
        public int Id { get; set; }
        public string Date { get; set; } = string.Empty;
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Studio { get; set; } = string.Empty;

        public List<string> Presenters { get; set; } = new();
        public List<string> Guests { get; set; } = new();
    }
}
