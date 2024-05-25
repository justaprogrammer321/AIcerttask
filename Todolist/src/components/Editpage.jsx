import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Editpage = () => {
  const [task, setTask] = useState({ title: '', description: '', status: '', dueDate: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, status, dueDate } = task;

    if (!title || !description || !status || !dueDate) {
      setError('All fields are required.');
      return;
    }

    if (id) {
      axios.put(`http://localhost:5000/tasks/${id}`, task)
        .then(() => navigate('/'))
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:5000/tasks', task)
        .then(() => navigate('/'))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{id ? 'Edit Task' : 'Create Task'}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <div>
          <label className="block text-gray-700">Title:</label>
          <input 
            type="text" 
            name="title" 
            value={task.title} 
            onChange={handleChange} 
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea 
            name="description" 
            value={task.description} 
            onChange={handleChange} 
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Status:</label>
          <select 
            name="status" 
            value={task.status} 
            onChange={handleChange} 
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Due Date:</label>
          <input 
            type="date" 
            name="dueDate" 
            value={task.dueDate} 
            onChange={handleChange} 
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Editpage;

