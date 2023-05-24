using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Form
    {
        [Key]
        public int IdForm { get; set; }

        public int PersonId { get; set; }

        public User Creator { get; set; }

        public string FormTitle { get; set; }
    }
}
