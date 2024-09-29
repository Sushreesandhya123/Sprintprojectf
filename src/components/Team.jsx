import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import teamImage from '../assets/team1.png';
import { HiArrowRight } from 'react-icons/hi';

const Team = () => {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // For navigation after successful team creation

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    if (!teamName) {
      alert('Please enter a team name.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/Team/teams/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_name: teamName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Team created:', data);
        // alert('Team created successfully!');

        navigate('/sprint');
      } else {
        alert('Failed to create team.');
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center relative">
      <div className="container mx-auto px-6 py-12 flex flex-wrap items-center justify-between relative z-10">
        <div className="w-full md:w-1/2 text-white">
          <h1 className="text-6xl font-bold mb-4">Create Your Own Team</h1>
          <p className="text-lg mb-6">
            Build your dream team, collaborate, and enjoy the journey together!
          </p>
          
          <label className="block text-lg mb-2">Create Your Own Team</label>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Enter your team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out text-black"
            />
          </div>
          <button
            onClick={handleCreateTeam}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded flex items-center justify-center transition duration-200 ease-in-out transform hover:scale-105"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Creating...' : 'Create Team'}
            {!loading && <HiArrowRight className="ml-2" size={20} />}
          </button>
        </div>

        <div className="w-full md:w-1/2">
          <img
            src={teamImage}
            alt="Teamwork Illustration"
            className="w-full h-auto transition-transform transform hover:scale-110"
            style={{ maxWidth: '600px' }}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-full animate-bubbles"></div>
    </div>
  );
};

export default Team;
