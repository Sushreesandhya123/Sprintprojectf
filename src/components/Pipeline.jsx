import React, { useEffect, useState } from 'react';

const Pipeline = () => {
  const [releases, setReleases] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    app_name: '',
    release_number: '',
  });

  // Fetch releases from the API
  const fetchReleases = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Productionpipeline/production_pipeline_releases/');
      const data = await response.json();
      setReleases(data);
    } catch (error) {
      console.error('Error fetching releases:', error);
    }
  };

  // Open/close popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (showPopup) {
      setFormData({
        id: null,
        app_name: '',
        release_number: '',
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
      const method = formData.id ? 'PUT' : 'POST';  // Check if we are updating or creating
      const url = formData.id
        ? `http://127.0.0.1:8000/Productionpipeline/production_pipeline_releases/${formData.release_id}/`
        : 'http://127.0.0.1:8000/Productionpipeline/production_pipeline_releases/';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_name: formData.app_name,
          release_number: formData.release_number,
        }),
      });
      await fetchReleases();
      togglePopup();
    } catch (error) {
      console.error('Error saving release:', error);
    }
  };


  const handleEdit = (item) => {
    setFormData(item);
    togglePopup();
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/Productionpipeline/production_pipeline_releases/${id}/`, {
        method: 'DELETE',
      });
      await fetchReleases();  // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting release:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchReleases();
  }, []);

  return (
    <div className="p-4">
      {/* Add P.P Release button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Production Pipeline Release</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={togglePopup}
        >
          Add P.P Release
        </button>
      </div>

      {/* Production Pipeline Release Table */}
      <table className="w-full text-left table-auto mt-4 bg-white shadow-md rounded">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-4 py-2">Sl No</th>
            <th className="px-4 py-2">App Name</th>
            <th className="px-4 py-2">Release Number</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {releases.length > 0 ? (
            releases.map((item, index) => (
              <tr key={item.release_id}>
                <td className="border px-4 py-2">{index + 1}</td> {/* Serial number */}
                <td className="border px-4 py-2">{item.app_name}</td>
                <td className="border px-4 py-2">{item.release_number}</td>
                <td className="border px-4 py-2">
                  <i
                    className="fa-solid fa-edit cursor-pointer text-green-500 mr-2"
                    onClick={() => handleEdit(item)}
                    title="Edit"
                  ></i>
                  <i
                    className="fa-solid fa-trash cursor-pointer text-red-500"
                    onClick={() => handleDelete(item.release_id)}
                    title="Delete"
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">
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
              {formData.id ? 'Edit P.P Release' : 'Add P.P Release'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">App Name</label>
                <input
                  type="text"
                  name="app_name"
                  value={formData.app_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Release Number</label>
                <input
                  type="text"
                  name="release_number"
                  value={formData.release_number}
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

export default Pipeline;
