import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';

const Todolistitem = ({ task, handleDelete }) => {
  return (
    <li className="bg-white p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-gray-600">{task.status} - {task.dueDate}</p>
      </div>
      <div className="flex space-x-2 items-start">
        <Link 
          to={`/task/edit/${task.id}`} 
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
        >
          <FiEdit className="mr-1" />
          Edit
        </Link>
        <button 
          onClick={() => handleDelete(task.id)} 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center"
        >
          <FiTrash className="mr-1" />
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todolistitem;

