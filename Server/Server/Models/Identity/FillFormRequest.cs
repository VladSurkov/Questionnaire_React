namespace Server.Models.Identity
{
    public class FillFormRequest
    {
        public Guid QuestionId { get; set; }

        public Guid FormId { get; set; }

        public string AnswerValue { get; set; }
    }
}
