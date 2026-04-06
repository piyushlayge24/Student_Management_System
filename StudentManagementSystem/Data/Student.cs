using System.ComponentModel.DataAnnotations;

namespace StudentManagementSystem.Data
{
    public class Student
    {
        public int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public Gender Gender { get; set; }

        [Required]
        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }

        public string EnrollmentNumber { get; set; }

        public DateTime AdmissionDate { get; set; } = DateTime.Now;

        // Your choice
        public string DepartmentName { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
