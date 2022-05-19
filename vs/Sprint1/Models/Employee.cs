using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sprint1.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeId { get; set; }
        [Required]
        [MaxLength(15)]
        public string EmployeePassword { get; set; }
        [Required]
        public string EmployeeEmailId { get; set; }
        [Required]
        public DateTime EmployeeDOB { get;set;}
        [Required,StringLength(30)]
        public string EmployeeName { get; set; }
        public string EmployeeStatus { get; set; }
        [Required]
        public string EmployeeDesignation { get; set; }
        [Required]
        public string EmployeeDepartment { get; set; }
    }
}
