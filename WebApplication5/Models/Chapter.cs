using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication5.Models
{
    public class Chapter
    {   [Key]
        public int ChapterID { get; set; }
        public string ChapterName { get; set; }

        public ICollection<Question> Questions { get; set; }
        public int SubjectID { get; set; }
    }
}
