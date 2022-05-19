using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sprint1.Models;
using Sprint1.Repositories;
using System;
using System.Collections.Generic;


namespace Sprint1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }
        [HttpPost]
        [Route("AddProject")]
        public IActionResult AddProject(string ProjectName)
        {
            try
            {
                return Ok(_projectRepository.AddProject(ProjectName));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteProject")]
        public IActionResult DeleteProjectById(int Pid)
        {
            try
            {
                return Ok(_projectRepository.DeleteProjectById(Pid));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        [Route("UpdateProject")]
        public IActionResult UpdateProject(int ProjectId,string ProjectName)
        {
            try
            {
                return Ok(_projectRepository.UpdateProject(ProjectId,ProjectName));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetProject")]
        public IActionResult GetAllProjects()
        {
            try
            {
                return Ok(_projectRepository.GetAllProjects());
            }
            catch(Exception ex) {
                return Content(ex.Message);
                    }
        }
    }
}
