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
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
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
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{item.description}</td>
                  <td className="border px-4 py-2 text-center">{item.status}</td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className="fa-solid fa-edit cursor-pointer text-green-500 mr-2"
                      onClick={() => handleEdit(item.id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash cursor-pointer text-red-500"
                      onClick={() => handleDelete(item.id)}
                    ></i>
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
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.planned}</td>
                  <td className="border px-4 py-2">{item.completed}</td>
                  <td className="border px-4 py-2">{item.incomplete}</td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className="fa-solid fa-edit cursor-pointer text-green-500 mr-2"
                      onClick={() => handleEdit(index)}
                    ></i>
                    <i
                      className="fa-solid fa-trash cursor-pointer text-red-500"
                      onClick={() => handleDelete(index)}
                    ></i>
                  </td>
                </tr>
              ))}
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
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.sprint}</td>
                  <td className="border px-4 py-2">{item.velocity}</td>
                  <td className="border px-4 py-2 text-center">
                    <i
                      className="fa-solid fa-edit cursor-pointer text-green-500 mr-2"
                      onClick={() => handleEdit(index)}
                    ></i>
                    <i
                      className="fa-solid fa-trash cursor-pointer text-red-500"
                      onClick={() => handleDelete(index)}
                    ></i>
                  </td>
                </tr>
              ))}
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
  
    fetchData();
  }, []);
  

  const handleClick = (index) => {
    setSelectedTableIndex(index);
    setTables((prevTables) => {
      const newTables = [...prevTables];
      const [clickedTable] = newTables.splice(index, 1);
      newTables.unshift(clickedTable);
      return newTables;
    });
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setFormData({});
  };

  const handleDelete = async (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/sprintgoals/${id}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            const dt = tables.filter(item => item.id !== id);
            setTables(dt);
          } else {
            console.error("Failed to delete item from server");
          }
        } catch (error) {
          console.error("Error during deletion:", error);
        }
      }
    }
  
    setIsEditDeletePopupOpen(true);
  };

  const handleEdit = () => {
    const currentRowData = getRowDataForEdit(); 
    setFormData(currentRowData); 
    setIsEditDeletePopupOpen(true);
    setIsEditMode(true); 
    setIsPopupOpen(true); 
  };

  const getRowDataForEdit = () => {
    const table = tables[selectedTableIndex];
    return {
      description: 'Task 1', // Replace with actual data
      status: 'Done', // Replace with actual data
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({});
    togglePopup();
  };

  const currentTable = tables[selectedTableIndex];

  return (
    <div className="p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{currentTable.title || 'No Table Available'}</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => {
          setIsEditMode(false);
          setFormData({});
          setIsPopupOpen(true);
        }}
      >
        Submit {currentTable.title.split(' ')[0]}
      </button>
    </div>
    <div className="mb-6 border-4 bg-white shadow-md" style={{ height: '400px' }}>
      <div className="overflow-y-scroll h-full">
        {currentTable.content || <p>No content available</p>}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {tables
        .filter((_, index) => index !== selectedTableIndex)
        .map((table, index) => (
          <div
            key={table.id}
            onClick={() => handleClick(index + (index >= selectedTableIndex ? 1 : 0))}
            className="cursor-pointer p-4 border rounded-md bg-white shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{table.title}</h3>
            <div className="overflow-y-scroll h-48"> {/* Set height for scrolling */}
              {table.content}
            </div>
          </div>
        ))}
    </div>

      {/* Add/Edit Entry Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? 'Edit Entry' : 'Add Entry'} {currentTable.title.split(' ')[0]}
            </h2>
            <form onSubmit={handleSubmit}>
              {currentTable.popupFields.map((field) => (
                <div className="mb-4" key={field.name}>
                  <label className="block text-gray-700">{field.label}:</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
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
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {isEditMode ? 'Save' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


