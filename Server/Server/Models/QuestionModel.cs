namespace Server.Models
{
    public class QuestionModel
    {
        public Guid Id { get; set; }

        public Guid FormId { get; set; }

        public string Question { get; set; }
    }
}
