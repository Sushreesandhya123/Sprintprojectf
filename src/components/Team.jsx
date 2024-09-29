import React, { useState } from 'react'; // Import useState
import teamImage from '../assets/team1.png'; 
import { HiArrowRight } from 'react-icons/hi'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Team = () => {
  const [teamName, setTeamName] = useState(''); // State for team name
  const navigate = useNavigate(); // Initialize navigate

  const handleCreateTeam = () => {
    console.log(teamName)
    if (teamName) { // Check if team name is not empty
      navigate('/sprint'); // Redirect to Sprint page
    } else {
      alert('Please enter a team name.'); // Optional error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center relative">
      <div className="container mx-auto px-6 py-12 flex flex-wrap items-center justify-between relative z-10">
        {/* Left side content */}
        <div className="w-full md:w-1/2 text-white">
          <h1 className="text-6xl font-bold mb-4">Create Your Own Team</h1>
          <p className="text-lg mb-6">
            Build your dream team, collaborate, and enjoy the journey together!
          </p>
          
          {/* Label and Input field */}
          <label className="block text-lg mb-2">Create Your Own Team</label>
          <div className="flex items-center mb-4">
            <input 
              type="text" 
              placeholder="Enter your team name"
              value={teamName} // Bind input value to state
              onChange={(e) => setTeamName(e.target.value)} // Update state on change
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out text-black"
            />
          </div>
          <button 
            onClick={handleCreateTeam} // Add onClick handler
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded flex items-center justify-center transition duration-200 ease-in-out transform hover:scale-105"
          >
            Create Team
            <HiArrowRight className="ml-2" size={20} /> 
          </button>
        </div>
        
        {/* Right side image */}
        <div className="w-full md:w-1/2">
          <img 
            src={teamImage} 
            alt="Teamwork Illustration" 
            className="w-full h-auto transition-transform transform hover:scale-110" 
            style={{ maxWidth: '600px' }} 
          />
        </div>
      </div>

      {/* Background bubbles */}
      <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-full animate-bubbles"></div>
    </div>
  );
};

export default Team;
