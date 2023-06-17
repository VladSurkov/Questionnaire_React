namespace Server.Models
{
    public class AnswerModel
    {
        public Guid Id { get; set; }

        public Guid UserFormId { get; set; }

        public Guid QuestionId { get; set; }

        public string AnswerValue { get; set; }
    }
}
