namespace Server.Models.Identity
{
    public class FormsForReviewerResponse
    {
        public Guid UserFormId { get; set; }

        public string User { get; set; }

        public string TitleForm { get; set; }

        public string FormStatus { get; set; }
    }
}
