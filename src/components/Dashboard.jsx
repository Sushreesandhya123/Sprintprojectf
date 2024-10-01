import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaUsers, FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    planned: "",
    completed: "",
    incomplete: "",
  });
  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [recentTeam, setRecentTeam] = useState(null);
  const [recentSprint, setRecentSprint] = useState(null);
  const [sprintData, setSprintData] = useState({});



  const fetchTeams = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Team/teams/');
      const data = await response.json();
      const sortedTeams = data.sort((a, b) => b.team_id - a.team_id);
      if (sortedTeams.length > 0) {
        setRecentTeam(sortedTeams[0]);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };
  const fetchSprints = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Sprint/sprints/');
      const data = await response.json();
      const sortedSprints = data.sort((a, b) => b.sprint_id - a.sprint_id);
      if (sortedSprints.length > 0) {
        setRecentSprint(sortedSprints[0]);
      }
    } catch (error) {
      console.error('Error fetching sprints:', error);
    }
  };

  const fetchSprintProgress = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Sprintprogress/sprintprogress/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Fetched Sprint Data:", result);
      setSprintData(result[0]); // Assuming the response is an array and we take the first item
    } catch (error) {
      console.error("Error fetching sprint progress data:", error);
    }
  };

  const fetchIndividualPerformance = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/Individualperformance/individualperformance/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Fetched Data:", result);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  const openPopup = (data = null) => {
    if (data) {
      setFormData({
        name: data.member_name,
        planned: data.planned_story_points,
        completed: data.completed_story_points,
        incomplete: data.incomplete_story_points,
      });
      setCurrentId(data.performance_id);
      setIsEditing(true);
    } else {
      setFormData({
        name: "",
        planned: "",
        completed: "",
        incomplete: "",
      });
      setCurrentId(null);
      setIsEditing(false);
    }
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      name: "",
      planned: "",
      completed: "",
      incomplete: "",
    });
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/Individualperformance/individualperformance/${currentId}`,
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
          fetchIndividualPerformance();
          closePopup();
        } else {
          const errorData = await response.json();
          console.error("Error updating individual performance:", errorData);
        }
      } catch (error) {
        console.error("Error updating individual performance:", error);
      }
    } else {
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
          fetchIndividualPerformance();
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
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/Individualperformance/individualperformance/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchIndividualPerformance();
      }
    } catch (error) {
      console.error("Error deleting individual performance:", error);
    }
  };
  useEffect(() => {
    fetchIndividualPerformance();
    fetchTeams();
    fetchSprints();
    fetchSprintProgress();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-2 bg-gray-100">
      <div className="flex justify-center mt-2">
        {recentTeam ? (
          <h1 className="text-xl font-bold">{recentTeam.team_name}</h1>
        ) : (
          <h2>No team available</h2>
        )}
      </div>
      <div className="flex justify-between mb-2">
      <div className="w-1/2">
          <h2 className="text-xl font-semibold">Scrum Master:{recentSprint ? recentSprint.scrum_master : 'No scrum master available'}</h2>
        </div>
        <div className="w-1/2 text-right">
          <h2 className="text-xl font-semibold">Sprint Duration:{recentSprint ? recentSprint.sprint_duration : 'No sprint duration available'}</h2>
        </div>
      </div>

      {/* Cards with Icons and Bubbles */}
      <div className="grid grid-cols-4 gap-5 my-5">
  {/* Card 1 */}
  <div className="relative flex flex-col justify-around p-6 bg-white border border-gray-300 rounded-md shadow-md box-border border-l-[7px] border-blue-600 overflow-hidden">
    <div className="flex items-center justify-between relative z-10">
      <p className="text-base text-primary">Total Team Capacity</p>
      <span className="text-[35px] text-blue-600">
      <FaUsers />
      </span>
    </div>
    <span className="text-lg font-semibold">{sprintData.total_team_capacity || 0}</span>
    {/* Bubble Designs */}
    <div className="absolute -top-12 -right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full opacity-30"></div>
  </div>

  {/* Card 2 */}
  <div className="relative flex flex-col justify-around p-6 bg-white border border-gray-300 rounded-md shadow-md box-border border-l-[7px] border-yellow-500 overflow-hidden">
    <div className="flex items-center justify-between relative z-10">
      <p className="text-base text-primary">Planned Story Points</p>
      <span className="text-[35px] text-yellow-500">
      <FaClipboardList />
      </span>
    </div>
    <span className="text-lg font-semibold">{sprintData.planned_story_points || 0}</span>
    {/* Bubble Designs */}
    <div className="absolute -top-12 -right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full opacity-30"></div>
  </div>

  {/* Card 3 */}
  <div className="relative flex flex-col justify-around p-6 bg-white border border-gray-300 rounded-md shadow-md box-border border-l-[7px] border-green-700 overflow-hidden">
    <div className="flex items-center justify-between relative z-10">
      <p className="text-base text-primary">Completed Story Points</p>
      <span className="text-[35px] text-green-700">
      <FaCheckCircle />
      </span>
    </div>
    <span className="text-lg font-semibold">{sprintData.completed_story_points || 0}</span>
    {/* Bubble Designs */}
    <div className="absolute -top-12 -right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full opacity-30"></div>
  </div>

  {/* Card 4 */}
  <div className="relative flex flex-col justify-around p-6 bg-white border border-gray-300 rounded-md shadow-md box-border border-l-[7px] border-red-600 overflow-hidden">
    <div className="flex items-center justify-between relative z-10">
      <p className="text-base text-primary">Incomplete Story Points</p>
      <span className="text-[35px] text-red-600">
      <FaTimesCircle />
      </span>
    </div>
    <span className="text-lg font-semibold">{sprintData.incomplete_story_points || 0}</span>
    {/* Bubble Designs */}
    <div className="absolute -top-12 -right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30"></div>
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full opacity-30"></div>
  </div>
</div>

      {/* Single Card for Table */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="p-4 bg-white rounded-lg shadow-lg transition duration-100 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Individual Performance</h3>
            <button onClick={() => openPopup()} className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Sprint Performance
            </button>
          </div>

          {/* Table for Individual Performance */}
          <div className="overflow-y-auto h-full">
            <table className="w-full text-left table-auto">
              <thead className="bg-blue-200">
                <tr>
                  <th className="border px-4 py-2">SL No</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Planned Story Point</th>
                  <th className="border px-4 py-2">Completed Story Point</th>
                  <th className="border px-4 py-2">Incomplete Story Point</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
              {currentItems.map((item, index) => (
                  <tr key={item.performance_id}>
                    {/* Serial Number */}
                    <td className="border px-4 py-2 text-center">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
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

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
  >
    <FaChevronLeft />
  </button>
  <div className="flex items-center mx-2">
    <span className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
  </div>
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
  >
    <FaChevronRight />
  </button>
</div>
        </div>
      </div>

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Performance" : "Add Performance"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Planned Story Points</label>
                <input
                  type="number"
                  name="planned"
                  value={formData.planned}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Completed Story Points</label>
                <input
                  type="number"
                  name="completed"
                  value={formData.completed}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Incomplete Story Points</label>
                <input
                  type="number"
                  name="incomplete"
                  value={formData.incomplete}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
