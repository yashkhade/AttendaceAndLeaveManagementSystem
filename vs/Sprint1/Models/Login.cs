using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Sprint1.Models
{

    public class Login
    {
        [Key]
        public int Id { get; set; }
        public string Role { get; set; }//Admin or Employee
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public string Password { get; set; }
    }
}
