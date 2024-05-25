import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-6">
      <div className="container mx-auto flex justify-between md:justify-around items-center">
        <Link to="/" className="text-white md:text-2xl font-semibold hover:text-gray-300">
          Task List
        </Link>
        <Link to="/createtask" className="text-white flex items-center md:text-2xl font-semibold hover:text-gray-300">
          Create New Task
          <FiPlus className="ml-2" />
        </Link>
      </div>
    </nav>
  );
}
