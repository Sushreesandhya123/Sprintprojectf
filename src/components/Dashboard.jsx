import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

export const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [formData, setFormData] = useState({
    name: "",
    planned: "",
    completed: "",
    incomplete: "",
  }); // Form data state
  const [data, setData] = useState([]); // State for table data
  const [currentId, setCurrentId] = useState(null); 

  // Fetch all individual performances (GET request)
  const fetchIndividualPerformance = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Individualperformance/individualperformance/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Fetched Data:", result);  // Log the fetched data
      setData(result); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle opening the popup
  const openPopup = (data = null) => {
    if (data) {
      setFormData({
        name: data.member_name,
        planned: data.planned_story_points,
        completed: data.completed_story_points,
        incomplete: data.incomplete_story_points,
      });
      setCurrentId(data.performance_id); // Store the ID separately for PUT requests
      setIsEditing(true);
    } else {
      setFormData({
        name: "",
        planned: "",
        completed: "",
        incomplete: "",
      });
      setCurrentId(null); // Reset the ID for POST requests
      setIsEditing(false);
    }
    setIsPopupOpen(true);
  };
  

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      name: "",
      planned: "",
      completed: "",
      incomplete: "",
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (POST or PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update individual performance (PUT request)
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/Individualperformance/individualperformance/${currentId}`, // Use currentId for PUT
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              member_name: formData.name,
              planned_story_points: formData.planned,
              completed_story_points: formData.completed,
              incomplete_story_points: formData.incomplete,
            }),
          }
        );
        if (response.ok) {
          fetchIndividualPerformance(); // Refresh data after updating
          closePopup();
        } else {
          const errorData = await response.json();
          console.error("Error updating individual performance:", errorData);
        }
      } catch (error) {
        console.error("Error updating individual performance:", error);
      }
    } else {
      // Create new individual performance (POST request)
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/Individualperformance/individualperformance/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              member_name: formData.name,
              planned_story_points: formData.planned,
              completed_story_points: formData.completed,
              incomplete_story_points: formData.incomplete,
            }),
          }
        );
        if (response.ok) {
          fetchIndividualPerformance(); // Refresh data after creating
          closePopup();
        } else {
          const errorData = await response.json();
          console.error("Error creating individual performance:", errorData);
        }
      } catch (error) {
        console.error("Error creating individual performance:", error);
      }
    }
  };
  

  // Handle delete action (DELETE request)
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/Individualperformance/individualperformance/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchIndividualPerformance(); // Refresh data after deleting
      }
    } catch (error) {
      console.error("Error deleting individual performance:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchIndividualPerformance();
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      {/* Team Name Section */}
      <h1 className="text-3xl font-bold text-left mb-2">Team Name</h1>

      {/* Scrum Master and Sprint Duration Row */}
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold">Scrum Master: Jane Doe</h2>
        </div>
        <div className="w-1/2 text-right">
          <h2 className="text-xl font-semibold">Sprint Duration: 2 weeks</h2>
        </div>
      </div>

      {/* Cards with Icons and Bubbles */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[{ title: "Planned User Stories", value: 10 }, { title: "Completed User Stories", value: 8 }, { title: "Incomplete User Stories", value: 2 }].map((card, index) => (
          <div key={index} className="relative p-8 bg-white rounded-lg shadow-lg  transition duration-300 overflow-hidden h-40">
            {/* Card Content */}
            <div className="flex justify-between items-center relative z-10 h-full">
              <div className="text-left">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-600 text-2xl font-bold text-center">{card.value}</p>
              </div>
              <div className="text-white bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center">Icon</div>
            </div>
            {/* Bubble Designs */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Single Card for Table */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow-lg  transition duration-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">IndividualPerformance</h3>
            <button onClick={() => openPopup()} className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition">
              Create
            </button>
          </div>

          {/* Table for Individual Performance */}
          <div className="overflow-y-auto h-full">
            <table className="w-full text-left table-auto">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Planned Story Point</th>
                  <th className="border px-4 py-2">Completed Story Point</th>
                  <th className="border px-4 py-2">Incomplete Story Point</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.performance_id}>
                    <td className="border px-4 py-2 text-center">{item.performance_id}</td>
                    <td className="border px-4 py-2 text-center">{item.member_name}</td>
                    <td className="border px-4 py-2 text-center">{item.planned_story_points}</td>
                    <td className="border px-4 py-2 text-center">{item.completed_story_points}</td>
                    <td className="border px-4 py-2 text-center">{item.incomplete_story_points}</td>
                    <td className="border px-4 py-2 text-center">
                      <button onClick={() => openPopup(item)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item.performance_id)} className="text-red-500 hover:text-red-700 ml-4">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit Individual Performance" : "Add Individual Performance"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Planned Story Points</label>
                <input
                  type="number"
                  name="planned"
                  value={formData.planned}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Completed Story Points</label>
                <input
                  type="number"
                  name="completed"
                  value={formData.completed}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Incomplete Story Points</label>
                <input
                  type="number"
                  name="incomplete"
                  value={formData.incomplete}
                  onChange={handleInputChange}
                  required
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={closePopup} className="bg-gray-400 text-white py-2 px-3 rounded-md hover:bg-gray-500 transition mr-2">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition">
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
