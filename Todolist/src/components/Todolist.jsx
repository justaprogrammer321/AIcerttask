import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Todolistitem from './Todolistitem';

const Todolist = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo List</h1>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No tasks found. <Link to="/createtask" className="text-blue-500">Create your first task</Link>.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <Todolistitem key={task.id} task={task} handleDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todolist;
