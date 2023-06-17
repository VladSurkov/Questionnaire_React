namespace Server.Models.Identity
{
    public class CreateFormRequest
    {
        public string FormTitle { get; set; }

        public string[] Questions { get; set; }
    }
}
