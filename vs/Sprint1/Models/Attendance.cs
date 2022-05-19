using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Sprint1.Models
{
    public class Attendance
    {
        [ForeignKey("EmployeeId")]
        public  int EmployeeId { get; set; }
        [Key]
        public int AttendanceId { get; set; }
        [Required]
        public DateTime AttendanceDate { get;set;}
        [Required]
        public string AttendanceCheck { get; set; }
    }
}
