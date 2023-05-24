using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Answer
    {
        [Key]
        public int IdAnswer { get; set; }

        public int UserFormId { get; set; }

        public string FreeText { get; set; }
    }
}
