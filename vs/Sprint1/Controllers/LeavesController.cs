using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sprint1.Controllers;
using Sprint1.Repositories;
using Sprint1.Models;
using Microsoft.Extensions.Configuration;

namespace Sprint1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        private readonly ILeaveRepository LeaveRepository;
        private readonly IConfiguration config;
        public LeavesController(ILeaveRepository leaveRepository,IConfiguration config)
        {
            this.LeaveRepository = leaveRepository;
            this.config = config;
        }
        //EndPoints
        [HttpGet]
        [Route("GetleavesbyEmployeeId")]
        public IActionResult GetLeaves(int EmployeeId)
        {
            try{
                return Ok(LeaveRepository.GetLeaves(EmployeeId));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        //[HttpPost]
        //[Route("addleave")]
        //public IActionResult AddLeave(int EmployeeId, DateTime LeaveStartDate, DateTime LeaveEndDate)
        //{
        //    try
        //    {
        //        return Ok(LeaveRepository.AddLeave(EmployeeId, LeaveStartDate, LeaveEndDate));
        //    }
        //    catch(Exception ex) {
        //        return Content(ex.Message);

        //    }
        //}
        [HttpGet]
        [Route("CountLeaves")]
        public IActionResult GetLeaveCount(DateTime from, DateTime to)
        {
            try
            {
                return Ok(LeaveRepository.GetLeaveCount(from,to));
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPost]
        //[Route("AddLeave")]
        public IActionResult AddLeaves([FromBody] Leaves leaves)
        {
            
            if (ModelState.IsValid)
            {
                //LeaveRepository.AddLeave(leaves.EmployeeId, leaves.LeaveStartDate, leaves.LeaveEndDate);
                bool isUploaded = Helper.UploadBlob(config, leaves).Result;
                if (isUploaded)
                {
                    return Ok("Adding leave request processed");
                }
                return StatusCode(StatusCodes.Status500InternalServerError, "Error in API");
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        [Route("RemoveLeave")]
        public IActionResult RemoveLeave(int leaveId)
        {
            try
            {
                return Ok(LeaveRepository.RemoveLeave(leaveId));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpPut]
        [Route("updateleaves")]
        public IActionResult UpdateLeave(int LeaveId, DateTime LeaveStartDate, DateTime LeaveEndDate)
        {
            try
            {
               return Ok(LeaveRepository.UpdateLeave(LeaveId, LeaveStartDate, LeaveEndDate));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        
        [HttpPut]
        [Route("viewpendingleavesResponse")]
        public IActionResult PendingLeaveResponse(int LeaveId,string LeaveStatus)
        {
            try
            {
                return Ok(LeaveRepository.PendingLeaveResponse(LeaveId, LeaveStatus));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetpendingLeavesbyEmployeeId")]
        public IActionResult PendingLeaveRequest()
        {
            try
            {
                return Ok(LeaveRepository.PendingLeaveRequest());
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
    }
}