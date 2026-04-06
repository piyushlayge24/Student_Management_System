create database StudentDB
CREATE TABLE Students (
    Id INT IDENTITY(1,1) PRIMARY KEY,

    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NULL,

    DateOfBirth DATE NOT NULL,

    Gender INT NOT NULL,  -- Enum (1=Male, 2=Female, 3=Other)

    Email NVARCHAR(150) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(20) NULL,

    Address NVARCHAR(MAX) NULL,
    City NVARCHAR(100) NULL,
    State NVARCHAR(100) NULL,

    EnrollmentNumber NVARCHAR(50) UNIQUE,

    AdmissionDate DATE NOT NULL,

    DepartmentName NVARCHAR(100) NULL,

    IsActive BIT NOT NULL DEFAULT 1,

    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);
select * from Students