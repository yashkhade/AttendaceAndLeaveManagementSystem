using System;
using System.Collections.Generic;
using Sprint1.Models;
using Sprint1.Repositories;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Sprint1.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly SprintDbContext db;
        public AttendanceRepository(SprintDbContext context)
        {
            this.db = context;
        }
        public string AddAttendance(int employeeId, DateTime AttendanceDate, string AttendanceCheck)
        {
            int res = DateTime.Compare(AttendanceDate, DateTime.Now);
            if (res <= 0 && AttendanceDate.Month == DateTime.Now.Month)
            {
                Attendance a = (from n in db.Attendance where n.EmployeeId == employeeId where n.AttendanceDate == AttendanceDate select n).SingleOrDefault();
                if (a == null)
                {
                    EmployeeProject ep = (from n in db.EmployeeProject where n.EmployeeId == employeeId where n.EpStatus=="Active" select n).SingleOrDefault();
                    if (ep != null)
                    {
                        List<Leaves> l = (from n in db.Leaves
                                          where n.EmployeeId == employeeId
                                          where n.LeaveStartDate.Year == AttendanceDate.Year
                                          where n.LeaveEndDate.Year == AttendanceDate.Year
                                          where n.LeaveStartDate.Month == AttendanceDate.Month
                                          where n.LeaveEndDate.Month == AttendanceDate.Month
                                          select n).ToList();
                        if (l != null)
                        {
                            foreach (Leaves l1 in l)
                            {
                                for (int i = l1.LeaveStartDate.Day; i <= l1.LeaveEndDate.Day; i++)
                                {
                                    int dt = i;
                                    if (dt == AttendanceDate.Day && AttendanceCheck == "absent")
                                    {
                                        Attendance a1 = new Attendance();
                                        a1.AttendanceDate = AttendanceDate;
                                        a1.AttendanceCheck = AttendanceCheck;
                                        a1.EmployeeId = employeeId;
                                        
                                        db.Attendance.Add(a1);
                                        db.SaveChanges();
                                        return ("Attendance Added");
                                    }
                                    if (dt == AttendanceDate.Day && AttendanceCheck == "present")
                                    {
                                        return ("Leave taken on same date, can't mark attendance as present please mark it as absent");
                                    }

                                }
                            }
                        }
                        Attendance a2 = new Attendance();
                        a2.AttendanceDate = AttendanceDate;
                        a2.AttendanceCheck = AttendanceCheck;
                        a2.EmployeeId = employeeId;
                        if ((AttendanceDate.DayOfWeek == DayOfWeek.Sunday || AttendanceDate.DayOfWeek == DayOfWeek.Saturday) && AttendanceCheck=="present")
                        {
                            return ("Can't mark as present on Saturday's and Sunday's");
                        }
                        db.Attendance.Add(a2);
                        db.SaveChanges();
                        return ("Attendance Added");
                    }
                    else
                    {
                        return ("Employee has not assigned any project,so can't mark attendance");
                    }
                }
                else
                {
                    return ($"Attendance for date {AttendanceDate} already exists");
                }
            }
            else
            {
                return ("You can mark attendance for current month with past dates only");
            }

        }

        public string DeleteAttendance(int AttendanceId)
        {
            Attendance attendance=db.Attendance.Find(AttendanceId);
            if (attendance != null)
            {
                db.Remove(attendance);
                db.SaveChanges();
                return ("Attendance deleted");
            }
            else
            {
                return("Invalid Attendance Id");
            }
        }

        public List<Attendance> GetAttendance(int EmployeeId)
        {
                List<Attendance> attendances = (from p in db.Attendance where p.EmployeeId == EmployeeId select p).ToList();
                return attendances;
        }

        public Attendance GetAttendanceByDate(int Id, DateTime date)
        {
                Attendance attendance = (from p in db.Attendance where p.EmployeeId == Id where p.AttendanceDate == date select p).Single();
            return attendance;
        }

        public List<Attendance> GetAttendanceByMonth(int EmployeeId, int month, int year)
        {
            DateTime today = DateTime.Today;
            List<Attendance> attendances = (from p in db.Attendance where p.EmployeeId == EmployeeId where p.AttendanceDate.Month == month where p.AttendanceDate.Year==year select p).ToList();
            if (attendances != null)
            {
                return attendances;
            }
            else
            {
                return null;
            }
        }

        public List<Attendance> GetAttendanceByYear(int EmployeeId, int year)
        {
            DateTime today = DateTime.Today;
            List<Attendance> attendances = (from p in db.Attendance where p.EmployeeId == EmployeeId where p.AttendanceDate.Year == year select p).ToList();
            return attendances;
        }

        public List<string> PendingAttendance(int EmployeeId)
        {
            List<DateTime> a=new List<DateTime>();
            int m = DateTime.Now.Date.Month;
            int y = DateTime.Now.Date.Year;
            int count = 0;
            DateTime dt = new DateTime(y,m,DateTime.Now.Day);
            for (int i= dt.Day; i >0; i--)
            {
                Attendance a1= (from n in db.Attendance
                                where n.EmployeeId == EmployeeId
                                where n.AttendanceDate.Date == dt.AddDays(-count)
                                select n).SingleOrDefault();
                if (a1 == null)
                {
                    if (dt.AddDays(-count).DayOfWeek != DayOfWeek.Sunday && dt.AddDays(-count).DayOfWeek != DayOfWeek.Saturday)
                    {
                        a.Add(dt.AddDays(-count));
                    }
                }
                count++;
                
            }
            List<string> s = new List<string>();
            foreach (DateTime d in a)
            {
                s.Add($"{d.Day}-{d.Month}-{d.Year}");
            }
            return s;
        }


        public string UpdateAttendance(int EmployeeId, DateTime Date,string AttendanceCheck)
        {
            Attendance attendance = (from n in db.Attendance where n.EmployeeId == EmployeeId where n.AttendanceDate == Date select n).SingleOrDefault();
            
            if (attendance != null)
            {
                int res = DateTime.Compare(Date, DateTime.Now);
                if (res <= 0 && Date.Month == DateTime.Now.Month)
                {
                    List<Leaves> l = (from n in db.Leaves
                                      where n.EmployeeId == EmployeeId
                                      where n.LeaveStartDate.Year == Date.Year
                                      where n.LeaveEndDate.Year == Date.Year
                                      where n.LeaveStartDate.Month == Date.Month
                                      where n.LeaveEndDate.Month == Date.Month
                                      select n).ToList();
                    if (l != null)
                    {
                        foreach (Leaves l1 in l)
                        {
                            for (int i = l1.LeaveStartDate.Day; i <= l1.LeaveEndDate.Day; i++)
                            {
                                int dt = i;
                                if (dt == Date.Day && AttendanceCheck == "absent")
                                {
                                    attendance.AttendanceCheck = AttendanceCheck;
                                    db.Update(attendance);
                                    db.SaveChanges();
                                    return ($"Attendance of Date {Date} Updated");
                                }
                                if (dt == Date.Day && AttendanceCheck == "present")
                                {
                                    return ("Leave taken on same date, can't mark attendance as present please");
                                }

                            }
                        }
                    }
                    attendance.AttendanceCheck = AttendanceCheck;
                    db.Update(attendance);
                    db.SaveChanges();
                    return ($"Attendance of {Date} updated");
                }
                else
                {
                    return ("You can mark attendance for current month with past dates only");
                }
            }
            else
            {
                return("Invalid Employee Id");
            }
        }
    }
}
