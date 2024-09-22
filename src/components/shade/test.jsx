import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [sprintGoals, setSprintGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://127.0.0.1:8000/sprintgoals/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response.json)
        return response.json();
      })
      .then(data => {
        setSprintGoals(data); // assuming the response is an array of goals
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        {sprintGoals.map((goal, index) => (
          <li key={index}>{goal.title}</li> // assuming each goal has a 'title' property
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
