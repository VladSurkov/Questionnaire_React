using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class UserFormModel
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public Guid FormId { get; set; }

        public FormStatus FormStatus { get; set; }

        public string? RejectedComment { get; set; }
    }
}
