namespace Server.Models.Identity
{
    public class GetAllFormResponse
    {
        public Guid FormId { get; set; }

        public string Creator { get; set; }

        public string FormTitle { get; set; }
    }
}
