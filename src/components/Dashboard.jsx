import React, { useState, useEffect } from 'react';

export const Dashboard = () => {
  const [tables, setTables] = useState([
    {
      id: 1,
      title: 'Sprint Goals',
      content: null,
      popupFields: [
        { name: 'description', label: 'Description' },
        { name: 'status', label: 'Status', type: 'select', options: ['Done', 'Blocking', 'Pending'] },
      ],
    },
    {
      id: 2,
      title: 'Individual Sprint Performance',
      content: null,
      popupFields: [
        { name: 'name', label: 'Name' },
        { name: 'planned', label: 'Planned Story Points' },
        { name: 'completed', label: 'Completed Story Points' },
        { name: 'incomplete', label: 'Incomplete Story Points' },
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this to set how many items you want per page

  const handleTableClick = (index) => {
    setSelectedTableIndex(index);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/sprintgoals/');
      const data = await response.json();

      const sprintGoalsContent = (
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
            {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
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
      );

      const individualSprintPerformanceContent = (
        <table className="w-full text-left table-auto">
          <thead className="bg-green-200">
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Planned Story Points</th>
              <th className="px-4 py-2">Completed Story Points</th>
              <th className="px-4 py-2">Incomplete Story Points</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your data fetching logic for this table */}
          </tbody>
        </table>
      );

      const teamVelocityContent = (
        <table className="w-full text-left table-auto">
          <thead className="bg-yellow-200">
            <tr>
              <th className="px-4 py-2">Sprint</th>
              <th className="px-4 py-2">Velocity (SP)</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your data fetching logic for this table */}
          </tbody>
        </table>
      );

      const updatedTables = [
        { ...tables[0], content: sprintGoalsContent },
        { ...tables[1], content: individualSprintPerformanceContent },
        { ...tables[2], content: teamVelocityContent },
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
    setIsPopupOpen(!isPopupOpen);
    setFormData({});
    setIsEditMode(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/sprintgoals/${id}`, {
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

  const handleEdit = (item) => {
    setIsEditMode(true);
    setFormData({
      id: item.id,
      description: item.description,
      status: item.status,
    });
    setIsPopupOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { description, status } = formData;

    try {
      if (isEditMode) {
        const response = await fetch(`http://127.0.0.1:8000/sprintgoals/${formData.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, status }),
        });

        if (response.ok) {
          togglePopup();
          fetchData(); // Refresh data
        }
      } else {
        const response = await fetch('http://127.0.0.1:8000/sprintgoals/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description, status }),
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

  // Pagination logic
  const totalPages = Math.ceil(tables[selectedTableIndex].content?.length / itemsPerPage);

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>

      {/* Table buttons */}
      <div className="flex justify-between mb-2">
  <div className="flex space-x-4">
    {tables.map((table, index) => (
      <button
        key={table.id}
        className={`py-2 px-4 rounded ${selectedTableIndex === index ? 'bg-cyan-600 text-white' : 'bg-gray-300'}`}
        onClick={() => handleTableClick(index)}
      >
        {table.title}
      </button>
    ))}
  </div>
  
  {/* Right-aligned button */}
  <button
    className="bg-cyan-600 text-white py-2 px-4 rounded"
    onClick={togglePopup}
  >
    {tables[selectedTableIndex]?.title === 'Sprint Goals' ? 'Add Sprint Goal' : 
     tables[selectedTableIndex]?.title === 'Individual Sprint Performance' ? 'Add Performance' : 
     'Add Velocity'}
  </button>
</div>


      {/* Display selected table content */}
      <div className="border p-4 bg-white w-full " style={{ height: '500px' }}>
        {tables[selectedTableIndex].content}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Popup for adding/editing items */}
      {isPopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded shadow-lg w-1/3"> {/* Adjusted padding and width */}
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
                className="border p-2 w-full h-12 text-lg" // Adjusted height and font size for the dropdown
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
                className="border p-2 w-full h-12 text-lg" // Adjusted height and font size for the input
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
