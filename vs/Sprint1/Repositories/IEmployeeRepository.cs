using System;
using System.Collections.Generic;
using Sprint1.Models;

namespace Sprint1.Repositories
{
    public interface IEmployeeRepository
    {
        List<Employee> GetEmployees();
        void AddEmployee(Employee employee);
        Employee GetEmployeeById(int id);
        string DeleteEmployeeById(int id);
        string UpdateEmployee(int EmployeeId,string EmployeeName,string EmployeeEmailId,
            DateTime EmployeeDOB,string EmployeeDesignation,string EmployeeDepartment);
        
        
    }
}
