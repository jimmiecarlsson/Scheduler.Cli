namespace Scheduler.Web.Dtos
{
    public class UpdateContributorRatesDto
    {
        public decimal HourlyRate { get; set; }
        public decimal EventAddon {  get; set; }
        public string DisplayName { get; set; } = string.Empty;


    }
}
