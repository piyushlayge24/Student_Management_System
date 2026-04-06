import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (err) {
            setError('Failed to fetch students. Ensure the backend is running and CORS is configured.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await deleteStudent(id);
                fetchStudents();
            } catch (err) {
                alert("Failed to delete student.");
            }
        }
    };

    const filteredStudents = students.filter(student => {
        const query = searchQuery.toLowerCase();
        const fullName = `${student.firstName || ''} ${student.lastName || ''}`.toLowerCase();
        const genderStr = student.gender === 1 ? 'male' : student.gender === 2 ? 'female' : student.gender === 3 ? 'other' : '';
        return (
            (student.enrollmentNumber && student.enrollmentNumber.toLowerCase().includes(query)) ||
            fullName.includes(query) ||
            (student.departmentName && student.departmentName.toLowerCase().includes(query)) ||
            genderStr.includes(query)
        );
    });

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2>Student Directory</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input 
                            type="text" 
                            placeholder="Search students..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0', outline: 'none' }}
                        />
                    </div>
                    <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => navigate('/add')}>
                        <PlusCircle size={18} /> Add Student
                    </button>
                </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Enrollment</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length === 0 ? (
                            <tr><td colSpan="10" style={{textAlign: 'center', padding: '2rem'}}>No students found.</td></tr>
                        ) : (
                            filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td>{student.enrollmentNumber}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{student.firstName} {student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.gender === 1 ? 'Male' : student.gender === 2 ? 'Female' : student.gender === 3 ? 'Other' : 'Unknown'}</td>
                                    <td>{student.departmentName}</td>
                                    <td>{student.address}</td>
                                    <td>{student.city}</td>
                                    <td>{student.state}</td>
                                    <td>{student.isActive ? 'Active' : 'Inactive'}</td>
                                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{background: '#cbd5e0', padding: '8px'}} onClick={() => navigate(`/edit/${student.id}`)}>
                                            <Edit size={16} />
                                        </button>
                                        <button className="btn btn-danger" style={{padding: '8px'}} onClick={() => handleDelete(student.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;
