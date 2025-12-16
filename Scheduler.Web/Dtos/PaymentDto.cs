namespace Scheduler.Web.Dtos
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public string Month { get; set; }
        public decimal Hours { get; set; }
        public int Events { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal VatAmount { get; set; }

    }
}
