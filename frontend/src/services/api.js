import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getStudents = async () => {
  const response = await api.get('/Student');
  return response.data;
};

export const getStudent = async (id) => {
  const response = await api.get(`/Student/${id}`);
  return response.data;
};

export const createStudent = async (student) => {
  const response = await api.post('/Student', student);
  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await api.put(`/Student/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/Student/${id}`);
  return response.data;
};

export default api;
