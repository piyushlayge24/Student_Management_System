import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStudent, getStudent, updateStudent } from '../services/api';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', dateOfBirth: '',
        gender: 1, phoneNumber: '', address: '', city: '', state: '',
        enrollmentNumber: '', departmentName: '', isActive: true
    });

    useEffect(() => {
        if (isEdit) {
            getStudent(id).then(data => {
                setForm({
                    ...data,
                    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : ''
                });
            });
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = { ...form, gender: parseInt(form.gender) };
            if (form.dateOfBirth) submitData.dateOfBirth = new Date(form.dateOfBirth).toISOString();

            if (isEdit) {
                await updateStudent(id, submitData);
            } else {
                await createStudent(submitData);
            }
            navigate('/');
        } catch (err) {
            alert('Failed to save student. ' + (err.response?.data || err.message));
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2>{isEdit ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div className="form-container">
                    <div className="form-group">
                        <label>First Name</label>
                        <input name="firstName" value={form.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input name="lastName" value={form.lastName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={form.gender} onChange={handleChange}>
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                            <option value={3}>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input name="address" value={form.address} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input name="city" value={form.city} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input name="state" value={form.state} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Enrollment Number</label>
                        <input name="enrollmentNumber" value={form.enrollmentNumber} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Department Name</label>
                        <input name="departmentName" value={form.departmentName} onChange={handleChange} />
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="btn" onClick={() => navigate('/')}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Save'} Student</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
