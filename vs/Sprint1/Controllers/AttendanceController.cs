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
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceRepository _attendanceRepository;
        public AttendanceController(IAttendanceRepository attendanceRepository)
        {
            _attendanceRepository = attendanceRepository;
        } 
        [HttpGet]
        [Route("GetbyEmployeeId")]
        public IActionResult GetAttendance(int EmployeeId)
        {
            try
            {
                return Ok(_attendanceRepository.GetAttendance(EmployeeId));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("Getbydate/{date}")]
        public IActionResult GetAttendanceByDate(int Id, DateTime date)
        {
            try
            {
                return Ok(_attendanceRepository.GetAttendanceByDate(Id, date));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("Getbymonth/{month}")]
        public IActionResult GetAttendanceByMonth(int EmployeeId, int month, int year)
        {
            try
            {
                return Ok(_attendanceRepository.GetAttendanceByMonth(EmployeeId, month, year));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("Getbyyear/{year}")]
        public IActionResult GetAttendanceByYear(int EmployeeId, int year)
        {
            try
            {
                return Ok(_attendanceRepository.GetAttendanceByYear(EmployeeId, year));
            }
            catch (Exception ex) { return Content(ex.Message); }
        }
        [HttpPut]
        [Route("updateattendance")]
        public IActionResult UpdateAttendance(int EmployeeId, DateTime Date,string AttendanceCheck)
        {
            try
            {
               return Ok(_attendanceRepository.UpdateAttendance(EmployeeId, Date,AttendanceCheck));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("addattendance")]
        public IActionResult AddAttendance(int employeeId, DateTime AttendanceDate, string AttendanceCheck)
        {
            try
            {
                return Ok(_attendanceRepository.AddAttendance(employeeId, AttendanceDate, AttendanceCheck));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        [Route("deleteattendance/{AttendanceId}")]
        public IActionResult DeleteAttendance(int AttendanceId)
        {
            try
            {
                return Ok(_attendanceRepository.DeleteAttendance(AttendanceId));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
        [HttpGet]
        [Route("GetPendingAttendance/{EmployeeId}")]
        public IActionResult PendingAttendance(int EmployeeId)
        {
            try
            {
               return Ok(_attendanceRepository.PendingAttendance(EmployeeId));
            }
            catch(Exception ex)
            {
                return Content(ex.Message);
            }
        }
    }
}
