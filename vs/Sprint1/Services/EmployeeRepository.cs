using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sprint1.Models;
using Sprint1.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Sprint1
{

    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly SprintDbContext dbContext;


        public EmployeeRepository(SprintDbContext context) //Constructor
        {
            this.dbContext = context;
        }
        public void AddEmployee(Employee employee) //Add Employees all fields
        {
            employee.EmployeeStatus = "Active";
            dbContext.Employee.Add(employee);
            dbContext.SaveChanges();
            Login l=new Login();
            l.Role = employee.EmployeeDesignation;
            l.Password = employee.EmployeePassword;
            l.EmployeeId=employee.EmployeeId;   
            dbContext.Login.Add(l);
            dbContext.SaveChanges();
        }

        public string DeleteEmployeeById(int EmployeeId)
        {
            Employee employee = (from n in dbContext.Employee where n.EmployeeId==EmployeeId where n.EmployeeStatus=="Active" select n).SingleOrDefault();
            Login l=dbContext.Login.Find(EmployeeId);
            EmployeeProject ep=(from n in dbContext.EmployeeProject where n.EmployeeId==EmployeeId select n).FirstOrDefault();
            if (employee != null)
            {
                employee.EmployeeStatus = "Inactive";
                dbContext.SaveChanges();
                if (l != null)
                {
                    dbContext.Login.Remove(l);
                    dbContext.SaveChanges();
                }
                if (ep != null && ep.EpStatus=="Active")
                {
                    ep.EpStatus = "Inactive";
                    dbContext.EmployeeProject.Update(ep);
                    dbContext.SaveChanges();
                }
                return ($"employee with ID {EmployeeId} deleted");
            }
            else
            {
                return ("Invalid EmployeeId");
            }
        }
        public Employee GetEmployeeById(int EmployeeId)
        {
            Employee e=(from n in dbContext.Employee where n.EmployeeId==EmployeeId where n.EmployeeStatus!="Inactive" select n).Single();
            return e;

        }

        public List<Employee> GetEmployees()
        {
            List<Employee> employee = (from i in dbContext.Employee where i.EmployeeStatus != "Inactive" select i).ToList();
            return employee;
        }
        public string UpdateEmployee(int EmployeeId,string EmployeeName,string EmployeeEmailId, DateTime EmployeeDOB, string EmployeeDesignation, string EmployeeDepartment)
        {
            Employee e = (from em in dbContext.Employee where em.EmployeeId ==EmployeeId where em.EmployeeStatus=="Active" select em).Single();
            if (e != null)
            {
                e.EmployeeName = EmployeeName;
                e.EmployeeDOB = EmployeeDOB;
                e.EmployeeDesignation = EmployeeDesignation;
                e.EmployeeDepartment = EmployeeDepartment;
                e.EmployeeEmailId = EmployeeEmailId;
                dbContext.Employee.Update(e);
                dbContext.SaveChanges();
                return ($"Employee with ID {EmployeeId} is updated");
            }
            else
            {
                return ("Invalid EmployeeId");
            }
        }

    }


}
