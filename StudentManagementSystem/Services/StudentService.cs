using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Data;

namespace StudentManagementSystem.Services
{
    public class StudentService : IStudentService
    {
        private readonly StudentDBContext _context;

        public StudentService(StudentDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Student>> GetAllAsync()
        {
            return await _context.Students.ToListAsync();
        }

        public async Task<Student?> GetByIdAsync(int id)
        {
            return await _context.Students.FindAsync(id);
        }

        public async Task<Student> CreateAsync(Student student)
        {
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<bool> UpdateAsync(int id, Student updated)
        {
            if (id != updated.Id)
                return false;

            var exists = await _context.Students.AnyAsync(e => e.Id == id);
            if (!exists) 
                return false;

            _context.Entry(updated).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if(student == null)
                return false;

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
