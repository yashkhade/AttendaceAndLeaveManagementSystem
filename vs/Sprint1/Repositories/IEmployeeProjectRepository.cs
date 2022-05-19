using System;
using System.Collections.Generic;
using Sprint1.Models;

namespace Sprint1.Repositories
{
    public interface IEmployeeProjectRepository
    {
        string AddEmployeeProject(int EmployeeId, int ProjectId);
        List<EmployeeProject> GetEmployeeProjectById(int ProjectId);
        string UpdateEmployeeProject(int NewProjectId, int EmployeeId);
        List<EmployeeProject> GetEmployeeProject();
    }
}
