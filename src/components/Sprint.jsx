import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import teamImage from '../assets/team2.png'; 

const Sprint = () => {
  const [scrumMaster, setScrumMaster] = useState('');
  const [sprintNumber, setSprintNumber] = useState('');
  const [sprintDuration, setSprintDuration] = useState('');
  const [dateOfReport, setDateOfReport] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateSprint = async () => {
    // Prevent further actions if fields are not filled
    if (!scrumMaster || !sprintNumber || !sprintDuration || !dateOfReport) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Send POST request to create sprint (team_id is handled on the backend)
      const response = await fetch('http://127.0.0.1:8000/Sprint/sprints/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scrum_master: scrumMaster,
          sprint_number: parseInt(sprintNumber),
          sprint_duration: sprintDuration,
          date_of_report: dateOfReport,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sprint created:', data);
        alert('Sprint created successfully!');

        // Navigate to the dashboard after successful creation
        navigate('/dashboard');
      } else {
        alert('Failed to create sprint.');
      }
    } catch (error) {
      console.error('Error creating sprint:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
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
                value={scrumMaster}
                onChange={(e) => setScrumMaster(e.target.value)}
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
                value={sprintNumber}
                onChange={(e) => setSprintNumber(e.target.value)}
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
                value={sprintDuration}
                onChange={(e) => setSprintDuration(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
              />
            </div>

            <div className="input-wrapper">
              <label className="block text-md font-medium text-gray-600 mb-1">
                Date of Report
              </label>
              <input
                type="date"
                value={dateOfReport}
                onChange={(e) => setDateOfReport(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
              />
            </div>

            <button 
              type="button" 
              onClick={handleCreateSprint} 
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Creating Sprint...' : 'Create Sprint'}
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
