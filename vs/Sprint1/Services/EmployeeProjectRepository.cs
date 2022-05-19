using Sprint1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sprint1.Repositories
{
    public class EmployeeProjectRepository : IEmployeeProjectRepository
    {
        private readonly SprintDbContext db;
        public EmployeeProjectRepository(SprintDbContext context)
        {
            this.db = context;
        }
        public string AddEmployeeProject(int EmployeeId, int ProjectId)
        {
                Employee emp = (from n in db.Employee where n.EmployeeId==EmployeeId where n.EmployeeStatus=="Active" select n).SingleOrDefault();
                Project pro = db.Project.Find(ProjectId);
                EmployeeProject ep=(from n in db.EmployeeProject where n.EmployeeId==EmployeeId where n.EpStatus=="Active" select n).SingleOrDefault();
            if (ep != null)
            {
                if (ep.ProjectId == ProjectId )
                {
                    return ("Current project of the employee is same as given");
                }
                else
                {
                    ep.EpStatus = "Inactive";
                    db.EmployeeProject.Update(ep);
                    db.SaveChanges();
                }
            }
            
                if (emp != null && pro != null)
                {
                    EmployeeProject obj = new EmployeeProject();
                    obj.EmployeeId = EmployeeId;
                    obj.ProjectId = ProjectId;
                    Project pr = (from p in db.Project where p.ProjectId == ProjectId select p).FirstOrDefault();
                    obj.ProjectName = pr.ProjectName;
                obj.EpStatus = "Active";
                    db.EmployeeProject.Add(obj);
                    db.SaveChanges();
                return ($"Project {obj.ProjectName} is assigned to employee with ID {EmployeeId}");
                }
            else
            {
                return ("Invalid EmployeeId or ProjectId");
            }
        }


        public string UpdateEmployeeProject(int NewProjectId, int EmployeeId)
        {
            Project project = (from n in db.Project where n.ProjectId == NewProjectId select n).SingleOrDefault();
            EmployeeProject obj = (from n in db.EmployeeProject where n.EmployeeId == EmployeeId where n.EpStatus == "Active" select n).SingleOrDefault();
            if (obj != null && project!=null)
            {
                    obj.ProjectId = NewProjectId;
                obj.ProjectName=project.ProjectName;
                obj.EpStatus = "Active";
                    db.EmployeeProject.Update(obj);
                    db.SaveChanges();
                return ($"Updated the Employee Project, Project {obj.ProjectName} is assigned to employee with ID {EmployeeId} ");
            }
            else
            {
                return ("Invalid ProjectId or EmployeeId or Employee has not been assigned any project");
            }
        }

        public List<EmployeeProject> GetEmployeeProjectById(int id)
        {
        
                List<EmployeeProject> Data = (from i in db.EmployeeProject where i.EmployeeId == id where i.EpStatus=="Active" select i).ToList();
            if (Data != null)
            {
                return Data;
            }
            else
            {
                return null;
            }
        }
        public List<EmployeeProject> GetEmployeeProject()
        {

            List<EmployeeProject> Data = (from i in db.EmployeeProject where i.EpStatus=="Active" select i).ToList();
            if (Data != null)
            {
                return Data;
            }
            else
            {
                return null;
            }
        }
    }
}
