import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import teamImage from '../assets/team2.png'; 

const Sprint = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateSprint = () => {
    // Perform any validations if necessary
    // Redirect to the Dashboard page after sprint creation
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-8">
        <form className="space-y-6 w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-center mb-6 border-b-2 pb-2 text-gray-700">
            Create Sprint
          </h2>
          <div className="space-y-6">
            <div className="input-wrapper">
              <label className="block text-md font-medium text-gray-600 mb-1">
                Scrum Master
              </label>
              <input
                type="text"
                placeholder="Enter Scrum Master Name"
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
              />
            </div>

            <div className="input-wrapper">
              <label className="block text-md font-medium text-gray-600 mb-1">
                Sprint Number
              </label>
              <input
                type="number"
                placeholder="Enter Sprint Number"
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
              />
            </div>

            <div className="input-wrapper">
              <label className="block text-md font-medium text-gray-600 mb-1">
                Sprint Duration
              </label>
              <input
                type="text"
                placeholder="Enter Sprint Duration"
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
              />
            </div>

            <div className="input-wrapper">
              <label className="block text-md font-medium text-gray-600 mb-1">
                Date of Report
              </label>
              <input
                type="date"
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
              />
            </div>

            <button 
              type="button" 
              onClick={handleCreateSprint} // Add click handler for creating sprint
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200 ease-in-out"
            >
              Create Sprint
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 bg-white flex items-center justify-center">
        <img src={teamImage} alt="Sprint Illustration" className="w-5/6 h-5/6" />
      </div>
    </div>
  );
};

export default Sprint;
