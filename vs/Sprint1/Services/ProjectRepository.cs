using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sprint1.Models;
namespace Sprint1.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly SprintDbContext db;

        public ProjectRepository(SprintDbContext context)
        {
            this.db = context;

        }
        public string AddProject(string ProjectName)
        {
            Project p=(from n in db.Project where n.ProjectName==ProjectName select n).FirstOrDefault();
            if (p == null)
            {
                Project p1 = new Project();
                p1.ProjectName = ProjectName;
                db.Project.Add(p1);
                db.SaveChanges();
                return ($"Project '{ProjectName}' added");
            }
            else
            {
                return ($"Project already exists with ProjectID: {p.ProjectId}");
            }

        }
        public string DeleteProjectById(int pid)
        {
                Project project = db.Project.Find(pid);
            if (project != null) {
                db.Project.Remove(project);
                db.SaveChanges();
                return ($"Project '{project.ProjectName}' is deleted");
            }

            else
            {
                return("Invalid ProjectId");
            }
        }

        public List<Project> GetAllProjects()
        {
            List<Project> project = (from i in db.Project select i).ToList();
            return project;
        }
        public string UpdateProject(int ProjectId,string ProjectName)
        {
            Project p=(from i in db.Project where i.ProjectId==ProjectId select i).SingleOrDefault();
            EmployeeProject ep=(from n in db.EmployeeProject where n.ProjectId==ProjectId select n).SingleOrDefault();
            if (ep != null)
            {
                ep.ProjectName=ProjectName;
                db.EmployeeProject.Update(ep);
                db.SaveChanges();
            }
            if (p != null)
            {
                p.ProjectName = ProjectName;
                db.Project.Update(p);
                db.SaveChanges();

                return ($"Project with ID {ProjectId} is updated with ProjectName '{ProjectName}'");
            }
            else
            {
                return ("Invalid ProjectId");
            }
        }

    }
}
