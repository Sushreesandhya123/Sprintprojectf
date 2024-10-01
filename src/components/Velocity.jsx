import React, { useEffect, useState } from 'react';

const Velocity = () => {
  const [velocities, setVelocities] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    completed_story_points: '',
    average_velocity_per_member: '',
    velocity_growth_percentage: '',
  });

  // Fetch velocities from the API
  const fetchVelocities = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/velocity/velocities/');
      const data = await response.json();
      setVelocities(data);
    } catch (error) {
      console.error('Error fetching velocities:', error);
    }
  };

  // Open/close popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (showPopup) {
      setFormData({
        id: null,
        completed_story_points: '',
        average_velocity_per_member: '',
        velocity_growth_percentage: '',
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST'; 
      const url = formData.id
        ? `http://127.0.0.1:8000/velocity/velocities/${formData.id}/`
        : 'http://127.0.0.1:8000/velocity/velocities/';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed_story_points: formData.completed_story_points,
          average_velocity_per_member: formData.average_velocity_per_member,
          velocity_growth_percentage: formData.velocity_growth_percentage,
        }),
      });
      
      // Refresh data after submit
      await fetchVelocities();
      togglePopup();
    } catch (error) {
      console.error('Error saving velocity:', error);
    }
  };

  // Edit functionality
  const handleEdit = (item) => {
    setFormData(item);
    togglePopup();
  };

  // Delete functionality
  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/velocity/velocities/${id}/`, {
        method: 'DELETE',
      });
      await fetchVelocities();  // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting velocity:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchVelocities();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Velocity Table</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={togglePopup}
        >
          Add Velocity
        </button>
      </div>

      <table className="w-full text-left table-auto mt-4 bg-white shadow-md rounded">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-4 py-2">Sl No</th> {/* Updated ID column */}
            <th className="px-4 py-2">Completed Story Points</th>
            <th className="px-4 py-2">Avg. Velocity Per Member</th>
            <th className="px-4 py-2">Velocity Growth (%)</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {velocities.length > 0 ? (
            velocities.map((item, index) => (  // Added index for serial numbers
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1}</td> {/* Serial number */}
                <td className="border px-4 py-2">{item.completed_story_points}</td>
                <td className="border px-4 py-2">{item.average_velocity_per_member}</td>
                <td className="border px-4 py-2">{item.velocity_growth_percentage}</td>
                <td className="border px-4 py-2">
                  <i
                    className="fa-solid fa-edit cursor-pointer text-green-500 mr-2"
                    onClick={() => handleEdit(item)}
                    title="Edit"
                  ></i>
                  <i
                    className="fa-solid fa-trash cursor-pointer text-red-500"
                    onClick={() => handleDelete(item.velocity_id)}  // Use item.id here
                    title="Delete"
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border px-4 py-2 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {formData.id ? 'Edit Velocity' : 'Add Velocity'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Completed Story Points</label>
                <input
                  type="number"
                  name="completed_story_points"
                  value={formData.completed_story_points}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Avg. Velocity Per Member</label>
                <input
                  type="number"
                  name="average_velocity_per_member"
                  value={formData.average_velocity_per_member}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Velocity Growth (%)</label>
                <input
                  type="number"
                  name="velocity_growth_percentage"
                  value={formData.velocity_growth_percentage}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {formData.id ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Velocity;
