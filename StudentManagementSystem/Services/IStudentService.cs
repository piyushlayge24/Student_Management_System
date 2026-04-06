using Microsoft.AspNetCore.Mvc.ModelBinding;
using StudentManagementSystem.Data;
using System.Collections;

namespace StudentManagementSystem.Services
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAllAsync();
        Task<Student?> GetByIdAsync(int id);
        Task<Student> CreateAsync(Student student);
        Task<bool> UpdateAsync(int id, Student updated);

        Task<bool> DeleteAsync(int id);
    }
}
