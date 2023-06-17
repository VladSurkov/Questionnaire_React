namespace Server.Models.Identity
{
    public class GetFormResponse
    {
        public string FormTitle { get; set; }

        public string Creator { get; set; }

        public List<QuestionModel> Questions { get; set; }
    }
}
