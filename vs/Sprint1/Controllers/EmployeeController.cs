using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sprint1.Models;
using Sprint1.Repositories;

namespace Sprint1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository employeerepository;

        public EmployeeController(IEmployeeRepository employeerepository)
        {
            this.employeerepository = employeerepository;
        }

        [HttpPost]
        [Route("AddEmployeenew")]
        public IActionResult AddEmployee(Employee employee)
        {
            try
            {
                employeerepository.AddEmployee(employee);
                return Ok("Employee Added");
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetEmployees")]
        public IActionResult GetEmployees()
        {
            try
            {
                List<Employee> employee = employeerepository.GetEmployees();
                return Ok(employee);
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetEmployeebyEmployeeId/{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            try
            {
                Employee employee = employeerepository.GetEmployeeById(id);
                return Ok(employee);
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpDelete]
        [Route("DeleteEmployeebyEmployeeID/{id}")]
        public IActionResult DeleteEmployeeByID(int id)
        {
            try
            {
                return Ok(employeerepository.DeleteEmployeeById(id));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPut]
        [Route("UpdateEmployee")]
        public string UpdateEmployee(int EmployeeId,string EmployeeName, string EmployeeEmailId, DateTime EmployeeDOB, string EmployeeDesignation, string EmployeeDepartment)
        {
            try
            {
                return (employeerepository.UpdateEmployee(EmployeeId, EmployeeName, EmployeeEmailId, EmployeeDOB, EmployeeDesignation, EmployeeDepartment));
                
            }
            catch(Exception ex)
            {
                return (ex.Message);
            }
        }

    }
}