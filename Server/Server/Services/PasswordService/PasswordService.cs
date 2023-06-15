using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Server.Services.PasswordService
{
    public class PasswordService : IPasswordService
    {
        public string HashPassword(string password, byte[] salt)
        {
            // Password hash generation using PBKDF2 and SHA256
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashedPassword;
        }

        public bool VerifyPassword(string password, byte[] salt, string hashedPassword)
        {
            // Generating a hash of the provided password using the same salt
            string hashedProvidedPassword = HashPassword(password, salt);

            // Comparing the hash of the provided password with the hash from the database
            return hashedPassword.Equals(hashedProvidedPassword);
        }
    }
}
