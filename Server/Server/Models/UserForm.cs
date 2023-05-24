using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class UserForm
    {
        [Key]
        public int UserFormId { get; set; }

        public int PersonId { get; set; }

        public List<Form> FormId { get; set; }

        public FormStatuses FormStatus { get; set; }

        public string? RejectedComment { get; set; }

        public User User { get; set; }
    }
}
