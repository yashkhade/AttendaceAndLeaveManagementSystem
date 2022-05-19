using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Sprint1.Models
{
    public class Leaves
    {
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        [Key]
        public int LeaveId { get; set; }
        [Required]
        public DateTime LeaveStartDate { get; set; }
        [Required]
        public DateTime LeaveEndDate { get; set; }
        public int LeaveCount { get; set; }
        public string LeaveStatus { get; set; }
        public int ProjectId { get; set; }
    }
}
