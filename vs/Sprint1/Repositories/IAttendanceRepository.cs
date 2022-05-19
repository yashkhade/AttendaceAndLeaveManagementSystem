using System;
using System.Collections.Generic;
using Sprint1.Models;

namespace Sprint1.Repositories
{
    public interface IAttendanceRepository
    {
        string AddAttendance(int employeeId,DateTime AttendanceDate,string AttendanceCheck);
        string UpdateAttendance(int EmployeeId,DateTime Date,string AttendanceCheck);
        string DeleteAttendance(int AttendanceId);
        List<Attendance> GetAttendanceByMonth(int EmployeeId,int month,int year);
        List<Attendance> GetAttendanceByYear(int EmployeeId, int year);
        Attendance GetAttendanceByDate(int EmployeeId,DateTime date);
        List<Attendance> GetAttendance(int EmployeeId);
        List<string> PendingAttendance(int EmployeeId);
    }
}
