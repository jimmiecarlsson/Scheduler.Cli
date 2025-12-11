namespace Scheduler.Domain.Entities
{
    public class Contributor
    {
        public int Id { get; set; }
        public string IdentityUserId { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public decimal HourlyRate { get; set; } = 750m;
        public decimal EventAddon { get; set; } = 300m;

        public List<PaymentRecord> Payments { get; set; } = new();


    }
}
