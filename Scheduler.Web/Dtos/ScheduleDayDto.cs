namespace Scheduler.Web.Dtos
{
    public class ScheduleDayDto
    {
        public string Date { get; set; } = string.Empty;
        public List<ScheduleBlockDto> Blocks { get; set; } = new();
    }
}
