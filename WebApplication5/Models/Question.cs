using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication5.Models
{
        public class Question
        {
            [Key]
            public int QuestionID { get; set; }
            public string Text { get; set; }
            public string Title { get; set; }
            public string TextPython { get; set; }
            public string TextMathematica { get; set; }
            
            //Foreign key to chapter
            public int ChapterID { get; set; }


        }
    
}