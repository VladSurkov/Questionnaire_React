namespace Server.Models.Identity
{
    public class CreateFormRequest
    {
        public string FormTitle { get; set; }

        public List<string> Questions { get; set; }
    }
}
