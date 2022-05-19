using Sprint1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sprint1.Repositories;

namespace Sprint1.Repositories
{
    public class LeaveRepository : ILeaveRepository
    {
        private readonly SprintDbContext db;
        public LeaveRepository(SprintDbContext context)
        {
            this.db = context;
        }
        public string AddLeave(int EmployeeId ,DateTime LeaveStartDate, DateTime LeaveEndDate)
        {
            EmployeeProject e = (from n in db.EmployeeProject where n.EmployeeId==EmployeeId select n).SingleOrDefault();

            if (e != null)
            {
                int res=DateTime.Compare(LeaveEndDate, LeaveStartDate);
                if (res >= 0 && LeaveStartDate>=DateTime.Now)
                {

                    Leaves l1 = new Leaves();
                    l1.EmployeeId = EmployeeId;
                    l1.LeaveStartDate = LeaveStartDate;
                    l1.LeaveEndDate = LeaveEndDate;
                    DateTime dt=LeaveStartDate;
                    int count = 0;
                    int actualcount = 0;
                    for(int i=LeaveStartDate.Day; i<=LeaveEndDate.Day; i++)
                    {
                        if(dt.DayOfWeek!=DayOfWeek.Sunday || dt.DayOfWeek != DayOfWeek.Saturday)
                        {
                            actualcount++;
                        }
                        dt = dt.AddDays(count++);
                    }
                    l1.LeaveCount = actualcount;
                    db.Leaves.Add(l1);
                    db.SaveChanges();
                    return ($"Leave for employee with ID {EmployeeId} is added");
                }
                else
                {
                    return ($"Chosse correct range of dates for leave");
                }
            }
            else
            {
                return ($"Invalid EmployeeId or no Project is assigned to Employee with ID {EmployeeId}");
            }
        }


        public List<Leaves> GetLeaves(int EmployeeId)
        {
            Employee e=(from n in db.Employee where n.EmployeeId == EmployeeId where n.EmployeeStatus=="active" select n).SingleOrDefault();
            if (e != null)
            {
                List<Leaves> leave = (from i in db.Leaves where i.EmployeeId == EmployeeId select i).ToList();
                return leave;
            }
            return null;
        }

        public int GetLeaveCount(DateTime from, DateTime to)
        {
            int lcount;
            if (to.Date == from.Date)
            {
                lcount=0;
            }

            int n = 0;
            DateTime nextDate = from;
            while (nextDate <= to.Date)
            {
                if (nextDate.DayOfWeek != DayOfWeek.Saturday && nextDate.DayOfWeek != DayOfWeek.Sunday)
                    n++;
                nextDate = nextDate.AddDays(1);
            }
            lcount=n;
            return lcount;
        }

        public List<Leaves> PendingLeaveRequest()
        {
            List<Leaves> l = (from n in db.Leaves where n.LeaveStatus == "Pending" select n).ToList();
            if (l != null)
            {
                return l;
            }
            return null;
        }

        public string PendingLeaveResponse(int LeaveId,string LeaveStatus)
        {
            Leaves l = db.Leaves.Find(LeaveId);
            if (l != null)
            {
                l.LeaveStatus= LeaveStatus;
                db.Leaves.Update(l);
                db.SaveChanges();
                return ($"Leave response for leaveId {LeaveId} is added");
            }
            else
            {
                return ("Invalid LeaveId");
            }
        }

        public string RemoveLeave(int LeaveId)
        {
            Leaves l = db.Leaves.Find(LeaveId);
            if (l != null)
            {
                if (l.LeaveStatus=="approve" || l.LeaveStatus=="reject")
                {
                    return("Leave already applied, you can't delete it instead you can try to update it");
                    
                }
                else
                {
                    db.Leaves.Remove(l);
                    db.SaveChanges();
                    return ($"Leave {LeaveId} is removed");
                }
            }
            else
            {
                return("Invalid LeaveId");
            }
        }


        public string UpdateLeave(int LeaveId, DateTime LeaveStartDate, DateTime LeaveEndDate)
        {
            Leaves l = db.Leaves.Find(LeaveId);
            if (l != null)
            {
                if (l.LeaveStatus == "approved" || l.LeaveStatus == "rejected") {
                    return("Leave can't be updated, try to apply for new leave");
                }
                else
                {
                    int res = DateTime.Compare(LeaveEndDate, LeaveStartDate);
                    if (res >= 0 && LeaveStartDate >= DateTime.Now)
                    {
                        l.LeaveEndDate = LeaveEndDate;
                        l.LeaveStartDate = LeaveStartDate;
                        DateTime dt = LeaveStartDate;
                        int count = 0;
                        int actualcount = 0;
                        for (int i = LeaveStartDate.Day; i <= LeaveEndDate.Day; i++)
                        {
                            if (dt.DayOfWeek != DayOfWeek.Sunday || dt.DayOfWeek != DayOfWeek.Saturday)
                            {
                                actualcount++;
                            }
                            dt = dt.AddDays(count++);
                        }
                        l.LeaveCount = actualcount;
                        db.Leaves.Update(l);
                        db.SaveChanges();
                        return ($"Leave with ID {LeaveId} is updated");
                    }
                    else{
                        return ($"Choose correct range of dates for leave");
                    }
                }
            }
            else
            {
                return ("Invalid LeaveId");
            }
        }
    }
}
