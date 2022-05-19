using System;
using System.Collections.Generic;
using Sprint1.Models;
using Sprint1.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace Sprint1.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly SprintDbContext db;
        public LoginRepository(SprintDbContext context)
        {
            this.db = context;
        }
        public bool CheckLogin(string Role, int EmployeeId, string Password)
        {
            Login l = (from n in db.Login where n.Password == Password where n.EmployeeId == EmployeeId where n.Role==Role select n).SingleOrDefault();

            if (l != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}