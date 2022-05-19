using System;
using System.Collections.Generic;
using Sprint1.Models;

namespace Sprint1.Repositories
{
    public interface IProjectRepository
    {
        string AddProject(string ProjectName);
        string DeleteProjectById(int ProjectId);
        string UpdateProject (int ProjectId,string ProjectName );
        List<Project> GetAllProjects();
    }
}
