namespace Server.Services.PasswordService
{
    public interface IPasswordService
    {
        public string HashPassword(string password, byte[] salt);

        public bool VerifyPassword(string password, byte[] salt, string hashedPassword);
    }
}
