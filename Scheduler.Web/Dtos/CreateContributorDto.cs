namespace Scheduler.Web.Dtos
{
    public class CreateContributorDto
    {
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public decimal HourlyRate { get; set; }
        public decimal EventAddon { get; set; }

    }
}
