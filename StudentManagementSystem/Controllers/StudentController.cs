using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Data;
using StudentManagementSystem.Services;

namespace StudentManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;

        public StudentController(IStudentService service) 
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Student>> SaveEmployee(Student employee)
        {
            var created = await _service.CreateAsync(employee);
            return Ok(created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, Student updated)
        {
            var success = await _service.UpdateAsync(id, updated);

            if (!success)
                return BadRequest("Update failed.");

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);

            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
