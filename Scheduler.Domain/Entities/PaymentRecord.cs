namespace Scheduler.Domain.Entities
{
    public class PaymentRecord
    {
        public int Id { get; set; }
        public DateTime Month { get; set; }
        public decimal Hours { get; set; }
        public int Events { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal VatAmount { get; set; }
        public int ContributorId { get; set; }
    }
}
