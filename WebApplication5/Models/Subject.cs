using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication5.Models
{
    public class Subject
    {
        [Key]
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }

        public ICollection<Chapter> Chapter { get; set; }

    }

}
