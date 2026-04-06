using Microsoft.EntityFrameworkCore;

namespace StudentManagementSystem.Data
{
    public class StudentDBContext: DbContext
    {
        public StudentDBContext(DbContextOptions<StudentDBContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
    }
}
