import React, { useState, useEffect } from 'react';

export const Sprintstatus = () => {
  const [tables, setTables] = useState([
    {
      id: 1,
      title: 'Sprint Goals',
      content: null,
      popupFields: [
        { name: 'description', label: 'Description' },
        { name: 'status', label: 'Status', type: 'select', options: ['Done', 'Backlog', 'Pending'] },
      ],
    },
    {
      id: 2,
      title: 'Sprint Progress',
      content: null,
      popupFields: [
        { name: 'planned_user_stories', label: 'Planned US' },
        { name: 'completed_user_stories', label: 'Completed US' },
        { name: 'incomplete_user_stories', label: 'Incomplete US' },
        { name: 'total_team_capacity', label: 'Total Team Capacity' },
        { name: 'planned_story_points', label: 'Planned SP' },
        { name: 'completed_story_points', label: 'Completed SP' },
        { name: 'incomplete_story_points', label: 'Incomplete SP' },
      ],
    },
    {
      id: 3,
      title: 'Team Velocity',
      content: null,
      popupFields: [
        { name: 'sprint', label: 'Sprint' },
        { name: 'velocity', label: 'Velocity (SP)' },
      ],
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sprintProgressData, setSprintProgressData] = useState([]);

  const handleTableClick = (index) => {
    setSelectedTableIndex(index);
  };

  const fetchData = async () => {
    try {
      const goalsResponse = await fetch('http://127.0.0.1:8000/Sprintgoal/sprintgoals/');
      const goalsData = await goalsResponse.json();
      const sprintGoalsContent = (
        <div className="overflow-y-auto h-full">
          <table className="w-full text-left table-auto">
            <thead className="bg-blue-200">
              <tr>
                <th className="px-4 py-2 text-center">Id</th>
                <th className="px-4 py-2 text-center">Description</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {goalsData.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">{item.id}</td>
                  <td className="border px-4 py-2 text-center">{item.description}</td>
                  <td className="border px-4 py-2 text-center">{item.status}</td>
                  <td className="border px-4 py-2 text-center">
                    <i className="fa-solid fa-edit cursor-pointer text-green-500 mr-2" onClick={() => handleEdit(item)}></i>
                    <i className="fa-solid fa-trash cursor-pointer text-red-500" onClick={() => handleDelete(item.id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      // Fetching sprint progress data
      const progressResponse = await fetch('http://127.0.0.1:8000/Sprintprogress/sprintprogress/');
      const progressData = await progressResponse.json();
      setSprintProgressData(progressData); // Store the fetched sprint progress data

      const sprintProgressContent = (
        <div className="overflow-auto h-64">
          <table className="w-full text-left table-auto">
            <thead className="bg-green-200">
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Planned US</th>
                <th className="px-4 py-2">Completed US</th>
                <th className="px-4 py-2">Incomplete US</th>
                <th className="px-4 py-2">Total Team Capacity</th>
                <th className="px-4 py-2">Planned SP</th>
                <th className="px-4 py-2">Completed SP</th>
                <th className="px-4 py-2">Incomplete SP</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sprintProgressData.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.planned_user_stories}</td>
                  <td className="border px-4 py-2">{item.completed_user_stories}</td>
                  <td className="border px-4 py-2">{item.incomplete_user_stories}</td>
                  <td className="border px-4 py-2">{item.total_team_capacity}</td>
                  <td className="border px-4 py-2">{item.planned_story_points}</td>
                  <td className="border px-4 py-2">{item.completed_story_points}</td>
                  <td className="border px-4 py-2">{item.incomplete_story_points}</td>
                  <td className="border px-4 py-2 text-center">
                    <i className="fa-solid fa-edit cursor-pointer text-green-500 mr-2" onClick={() => handleEditProgress(item)}></i>
                    <i className="fa-solid fa-trash cursor-pointer text-red-500" onClick={() => handleDeleteProgress(item.id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      const teamVelocityContent = (
        <div className="overflow-auto h-64">
          <table className="w-full text-left table-auto">
            <thead className="bg-yellow-200">
              <tr>
                <th className="px-4 py-2">Sprint</th>
                <th className="px-4 py-2">Velocity (SP)</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      );

      const updatedTables = [
        { ...tables[0], content: sprintGoalsContent },
        { ...tables[1], content: sprintProgressContent },
        { ...tables[2], content: teamVelocityContent },
      ];

      setTables(updatedTables);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setFormData({});
    setIsEditMode(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/Sprintgoal/sprintgoals/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchData(); // Refresh data after deletion
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  // CRUD for Sprint Progress
  const handleEditProgress = (item) => {
    setIsEditMode(true);
    setFormData({
      id: item.id,
      planned_user_stories: item.planned_user_stories,
      completed_user_stories: item.completed_user_stories,
      incomplete_user_stories: item.incomplete_user_stories,
      total_team_capacity: item.total_team_capacity,
      planned_story_points: item.planned_story_points,
      completed_story_points: item.completed_story_points,
      incomplete_story_points: item.incomplete_story_points,
    });
    setIsPopupOpen(true);
  };

  const handleDeleteProgress = async (id) => {
    if (window.confirm("Are you sure you want to delete this Sprint Progress?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/Sprintprogress/sprintprogress/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchData(); // Refresh data after deletion
        }
      } catch (error) {
        console.error('Error deleting Sprint Progress:', error);
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode
      ? `http://127.0.0.1:8000/Sprintprogress/sprintprogress/${formData.id}`
      : `http://127.0.0.1:8000/Sprintprogress/sprintprogress/`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        togglePopup();
        fetchData(); // Refresh data after submission
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedRowIndex(item.id);
    setFormData(item);
    setIsEditMode(true);
    togglePopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Sprint Status</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {tables.map((table, index) => (
          <div key={table.id} className={`border p-4 ${selectedTableIndex === index ? 'bg-blue-100' : ''}`} onClick={() => handleTableClick(index)}>
            <h2 className="font-semibold text-lg">{table.title}</h2>
            {table.content}
            <button onClick={togglePopup} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add {table.title}</button>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{isEditMode ? 'Edit Entry' : 'Add Entry'}</h2>
            <form onSubmit={handleFormSubmit}>
              {tables[selectedTableIndex].popupFields.map((field) => (
                <div key={field.name} className="mb-2">
                  <label className="block">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-1 w-full"
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded p-1 w-full"
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isEditMode ? 'Update' : 'Add'}</button>
              <button type="button" onClick={togglePopup} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
