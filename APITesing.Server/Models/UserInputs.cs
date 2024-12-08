namespace APITesing.Server.Models
{
    public class UserInputs
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required int CreditCardNumber { get; set; }
        public required int PIN{ get; set; }
        public required string ExpiryDate{ get; set; }
        public DateTime CurrentDate { get; set; }
        public DateTime DatePlusOneYear { get; set; }
    }
}
    
