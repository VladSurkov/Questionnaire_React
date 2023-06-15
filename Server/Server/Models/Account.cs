namespace Server.Models
{
    public class Account : BaseEntity
    {
        public string FirstName { get; set; }

        public string SecondName { get; set; }

        public string Email { get; set; }

        public string HashPassword { get; set; }

        public byte[] SaltPassword { get; set; }

        public Roles Role { get; set; }
    }
}
