namespace Server.Models.Identity
{
    public class FormForReviewerResponse
    {
        public string User { get; set; }

        public string FormTitle { get; set; }

        public string Status { get; set; }

        public List<QuestionAndAnswer> Answers { get; set; }
    }
}
