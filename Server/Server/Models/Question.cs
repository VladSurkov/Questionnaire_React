using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Question
    {
        [Key]
        public int QuestionId { get; set; }

        public int FormId { get; set; }

        public string QuestionTitle { get; set; }

        public List<Answer> Answer { get; set; }
    }
}
