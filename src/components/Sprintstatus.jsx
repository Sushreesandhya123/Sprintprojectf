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
    // {
    //   id: 3,
    //   title: 'Team Velocity',
    //   content: null,
    //   popupFields: [
    //     { name: 'sprint', label: 'Sprint' },
    //     { name: 'velocity', label: 'Velocity (SP)' },
    //   ],
    // },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleTableClick = (index) => {
    setSelectedTableIndex(index);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Sprintgoal/sprintgoals/');
      const data = await response.json();
      const sprintGoalsContent = (
        <div className="overflow-y-auto h-full">
          <table className="w-full text-left table-auto">
            <thead className="bg-blue-200">
              <tr>
                <th className="px-4 py-2 text-center">SL No</th>
                <th className="px-4 py-2 text-center">Description</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{item.description}</td>
                  <td className="border px-4 py-2 text-center">{item.status}</td>
                  <td className="border px-4 py-2 text-center">
                    <i className="fa-solid fa-edit cursor-pointer text-green-500 mr-2" onClick={() => handleEdit(item, 1)}></i>
                    <i className="fa-solid fa-trash cursor-pointer text-red-500" onClick={() => handleDelete(item.id, 1)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      const sprintProgressResponse = await fetch('http://127.0.0.1:8000/Sprintprogress/sprintprogress/'); // Adjust the endpoint for Sprint Progress
      const sprintProgressData = await sprintProgressResponse.json();

      const sprintProgressContent = (
        <div className="overflow-auto h-64">
          <table className="w-full text-left table-auto">
            <thead className="bg-green-200">
              <tr>
                <th className="px-4 py-2">SL No</th>
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
            { sprintProgressData.map((item, index) => (
                <tr key={item.progress_id}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{item.planned_user_stories}</td>
                  <td className="border px-4 py-2 text-center">{item.completed_user_stories}</td>
                  <td className="border px-4 py-2 text-center">{item.incomplete_user_stories}</td>
                  <td className="border px-4 py-2 text-center">{item.total_team_capacity}</td>
                  <td className="border px-4 py-2 text-center">{item.planned_story_points}</td>
                  <td className="border px-4 py-2 text-center">{item.completed_story_points}</td>
                  <td className="border px-4 py-2 text-center">{item.incomplete_story_points}</td>
                  <td className="border px-4 py-2 text-center">
                    <i className="fa-solid fa-edit cursor-pointer text-green-500 mr-2" onClick={() => handleEdit(item, 2)}></i>
                    <i className="fa-solid fa-trash cursor-pointer text-red-500" onClick={() => handleDelete(item.progress_id, 2)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      // const teamVelocityContent = (
      //   <div className="overflow-auto h-64"> {/* Set fixed height and enable overflow */}
      //     <table className="w-full text-left table-auto">
      //       <thead className="bg-yellow-200">
      //         <tr>
      //           <th className="px-4 py-2">Sprint</th>
      //           <th className="px-4 py-2">Velocity (SP)</th>
      //           <th className="px-4 py-2 text-center">Action</th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //       </tbody>
      //     </table>
      //   </div>
      // );

      const updatedTables = [
        { ...tables[0], content: sprintGoalsContent },
        { ...tables[1], content: sprintProgressContent },
        // { ...tables[2], content: teamVelocityContent },
      ];

      setTables(updatedTables);
    } catch (error) {
      console.error('Error fetching sprint goals:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const togglePopup = () => {
    if (isPopupOpen) {
      // If the popup is currently open, reset the form data and edit mode
      setFormData({});
      setIsEditMode(false);
    }
    
    // Toggle the popup open/close
    setIsPopupOpen(!isPopupOpen);
  };
  

  const handleDelete = async (id, tableIndex) => {
    if (!id || !tableIndex) {
      console.error("Invalid ID or tableIndex:", id, tableIndex);
      alert("Cannot delete the item. ID or tableIndex is missing.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        let apiUrl = '';

        // Determine the API URL based on the tableIndex
        if (tableIndex === 1) {
          apiUrl = `http://127.0.0.1:8000/Sprintgoal/sprintgoals/${id}`;
        } else if (tableIndex === 2) {
          apiUrl = `http://127.0.0.1:8000/Sprintprogress/sprintprogress/${id}`;
        }

        console.log(`Sending DELETE request to: ${apiUrl}`);

        const response = await fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Item successfully deleted!');
          fetchData(); // Refresh the table data after deletion
        } else {
          const errorText = await response.text();
          console.error(`Error response from server: ${errorText}`);
          throw new Error(`Failed to delete: ${errorText}`);
        }
      } catch (error) {
        console.error('Error deleting item:', error.message);
        alert(`Error deleting item: ${error.message}`);
      }
    }
  };

  const handleEdit = (item, tableIndex) => {
    setIsEditMode(true);
    
    if (tableIndex === 1) {
      console.log('Editing Sprint Goals:', item);  // Debugging log before setting state
      setFormData({
        id: item.id,  // Use 'id' for Sprint Goals
        description: item.description,
        status: item.status,
      });
    } else if (tableIndex === 2) {
      console.log('Editing Sprint Progress:', item);  // Debugging log before setting state
      setFormData({
        progress_id: item.progress_id,  // Use 'progress_id' for Sprint Progress
        planned_user_stories: item.planned_user_stories,
        completed_user_stories: item.completed_user_stories,
        incomplete_user_stories: item.incomplete_user_stories,
        total_team_capacity: item.total_team_capacity,
        planned_story_points: item.planned_story_points,
        completed_story_points: item.completed_story_points,
        incomplete_story_points: item.incomplete_story_points,
      });
    }
    
    togglePopup();  // Open the form popup for editing
  };

  


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { planned_user_stories, completed_user_stories, incomplete_user_stories, total_team_capacity, planned_story_points, completed_story_points, incomplete_story_points, description, status } = formData;
  
    try {
      let apiUrl = '';
      let method = '';
  
      // Determine which table is being worked on
      if (selectedTableIndex === 0) {
        // For Sprint Goals table
        apiUrl = isEditMode ? `http://127.0.0.1:8000/Sprintgoal/sprintgoals/${formData.id}/` : 'http://127.0.0.1:8000/Sprintgoal/sprintgoals/';
        method = isEditMode ? 'PUT' : 'POST';
  
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, status }),
        });
  
        if (response.ok) {
          togglePopup();
          fetchData(); // Refresh data
        }
      } else if (selectedTableIndex === 1) {
        // For Sprint Progress table
        apiUrl = isEditMode ? `http://127.0.0.1:8000/Sprintprogress/sprintprogress/${formData.progress_id}/` : 'http://127.0.0.1:8000/Sprintprogress/sprintprogress/';
        method = isEditMode ? 'PUT' : 'POST';
  
        const response = await fetch(apiUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planned_user_stories,
            completed_user_stories,
            incomplete_user_stories,
            total_team_capacity,
            planned_story_points,
            completed_story_points,
            incomplete_story_points,
          }),
        });
  
        if (response.ok) {
          togglePopup();
          fetchData(); // Refresh data
        }
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-2">Sprint Status</h1>

      {/* Table buttons */}
      <div className="flex justify-between mb-2">
        <div className="flex space-x-4">
          {tables.map((table, index) => (
            <button
              key={table.id}
              className={`py-2 px-4 rounded ${selectedTableIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
              onClick={() => handleTableClick(index)}
            >
              {table.title}
            </button>
          ))}
        </div>
        
        {/* Right-aligned button */}
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded"
          onClick={togglePopup}
        >
          {tables[selectedTableIndex]?.title === 'Sprint Goals' ? 'Add Sprint Goal' : 
           tables[selectedTableIndex]?.title === 'Sprint Progress' ? 'Add Progress' : null}
        </button>
      </div>

      {/* Display selected table content */}
      <div className="border p-4 bg-white w-full" style={{ height: '500px' }}>
        {tables[selectedTableIndex].content}
      </div>

      {/* Popup for adding/editing items */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Item' : 'Add Item'}</h2>
            <form onSubmit={handleSubmit}>
              {tables[selectedTableIndex].popupFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block mb-2">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      required
                      className="border p-2 w-full h-12 text-lg"
                    >
                      <option value="" disabled>Select Status</option>
                      {field.options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="border p-2 w-full h-12 text-lg"
                      required
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={togglePopup}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {isEditMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default Sprintstatus