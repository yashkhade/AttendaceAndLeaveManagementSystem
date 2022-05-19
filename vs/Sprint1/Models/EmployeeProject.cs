using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Sprint1.Models
{
    public class EmployeeProject
    {
        [ForeignKey("Employee")]
        [Required]
        public int EmployeeId { get; set; }
        [ForeignKey("Project")]
        [Required]
        public int ProjectId { get; set; }
        [Key]
        public int EmployeeProjectId { get; set; }
        public string ProjectName { get; set; }
        public string EpStatus { get; set; }
    }
}
