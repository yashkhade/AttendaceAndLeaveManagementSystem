using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sprint1.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }
        [Required]
        [StringLength(40)]
        public string ProjectName { get; set; }
    }
}
