using System;
using System.Collections.Generic;
using Sprint1.Models;

namespace Sprint1.Repositories
{
    public interface ILeaveRepository
    {
        string AddLeave(int EmployeeId,DateTime LeaveStartDate,DateTime LeaveEndDate);
        string RemoveLeave(int LeaveId);
        string UpdateLeave(int LeaveId, DateTime LeaveStartDate, DateTime LeaveEndDate);
        List<Leaves> GetLeaves(int EmployeeId);
        List<Leaves> PendingLeaveRequest();
        string PendingLeaveResponse(int LeaveId,string LeaveStatus);
        int GetLeaveCount(DateTime from, DateTime to);
    }
}
