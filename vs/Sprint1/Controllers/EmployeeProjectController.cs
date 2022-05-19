using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Sprint1.Repositories;
using Sprint1.Models;

namespace Sprint1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeProjectController : ControllerBase
    {
        private readonly IEmployeeProjectRepository _employeeProjectRepository;
        public EmployeeProjectController(IEmployeeProjectRepository projectRepository)
        {
            _employeeProjectRepository = projectRepository;
        }
        [HttpPost]
        [Route("addemployeeProject")]
        public IActionResult AddEmployeeProject(int EmployeeId, int ProjectId)
        {
            try
            {
                return Ok(_employeeProjectRepository.AddEmployeeProject(EmployeeId, ProjectId));
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
        
        [HttpPut]
        [Route("updateemployeeProject")]
        public IActionResult UpdateEmployeeProject(int NewProjectId, int EmployeeId)
        {
            try
            {
               return Ok(_employeeProjectRepository.UpdateEmployeeProject(NewProjectId, EmployeeId));
            }
            catch(Exception ex){
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetEmployeeProjectbyEmployeeId")]
        public IActionResult GetEmployeeProject(int Employeeid)
        {
            try
            {
                return Ok(_employeeProjectRepository.GetEmployeeProjectById(Employeeid));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetEmployeeProjects")]
        public IActionResult GetEmployeeProject() {
            try
            {
                return Ok(_employeeProjectRepository.GetEmployeeProject());
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
