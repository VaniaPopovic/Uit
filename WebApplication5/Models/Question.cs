using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication5.Models
{
        public class Question
        {
            [Key]
            public int QuestionID { get; set; }
            public string HelpPython { get; set; }
            public string HelpMathematica { get; set; }
            public string Title { get; set; }
            public string TextPython { get; set; }
            public string TextMathematica { get; set; }
            public string CorrectAnswer { get; set; }
            
            //Foreign key to chapter
            public int ChapterID { get; set; }


        }
    
}