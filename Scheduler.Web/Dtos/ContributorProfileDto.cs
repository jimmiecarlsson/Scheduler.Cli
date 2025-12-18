namespace Scheduler.Web.Dtos
{
    public class ContributorProfileDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public decimal HourlyRate { get; set; }
        public decimal EventAddon {  get; set; }
        public string DisplayName { get; set; }

    }
}
