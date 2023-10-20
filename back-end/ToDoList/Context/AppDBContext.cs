using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.Context
{
    public class AppDBContext : DbContext
    {
        //public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<Atividades> Atividades { get; set;}
    }
}
