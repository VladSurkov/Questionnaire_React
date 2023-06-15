using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace Server.Models.Identity
{
    public class RegisterRequest
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; } = null!;

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Пароль")]
        public string Password { get; set; } = null!;

        /*[Required]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        [DataType(DataType.Password)]
        [Display(Name = "Подтвердить пароль")]
        public string PasswordConfirm { get; set; } = null!;*/

        [Required]
        [Display(Name = "Имя")]
        public string FirstName { get; set; } = null!;

        [Required]
        [Display(Name = "Фамилия")]
        public string SecondName { get; set; } = null!;

        [Required]
        [Display(Name = "Роль")]
        public string Role { get; set; }
    }
}
