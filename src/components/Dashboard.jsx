import React, { useState } from 'react';
import UserDashboard from './shade/test';

export const Dashboard = () => {
  const [tables, setTables] = useState([
    {
      id: 1,
      title: 'Sprint Goals',
      content: (
        <table className="w-full text-left table-auto">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-4 py-2">Sl No</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Task 1</td>
              <td className="border px-4 py-2">Done</td>
            </tr>
          </tbody>
        </table>
      ),
      popupFields: [
        { name: 'slNo', label: 'Sl No' },
        { name: 'description', label: 'Description' },
        { name: 'status', label: 'Status', type: 'select', options: ['Done', 'Blocking', 'Pending'] },
      ],
    },
    {
      id: 2,
      title: 'Individual Sprint Performance',
      content: (
        <table className="w-full text-left table-auto">
          <thead className="bg-green-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Planned Story Points</th>
              <th className="px-4 py-2">Completed Story Points</th>
              <th className="px-4 py-2">Incomplete Story Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Alice</td>
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">4</td>
              <td className="border px-4 py-2">1</td>
            </tr>
          </tbody>
        </table>
      ),
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
      content: (
        <table className="w-full text-left table-auto">
          <thead className="bg-yellow-200">
            <tr>
              <th className="px-4 py-2">Sprint</th>
              <th className="px-4 py-2">Velocity (SP)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Sprint 1</td>
              <td className="border px-4 py-2">20</td>
            </tr>
          </tbody>
        </table>
      ),
      popupFields: [
        { name: 'sprint', label: 'Sprint' },
        { name: 'velocity', label: 'Velocity (SP)' },
      ],
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);

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
          onClick={togglePopup}
        >
          Add {currentTable.title.split(' ')[0]}
        </button>
      </div>
      <div className="mb-6  border-4 p-4 bg-white shadow-md" style={{ height: '400px' }}>
        {currentTable.content || <p>No content available</p>}
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
              {table.content}
            </div>
          ))}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add Entry to {currentTable.title}</h2>
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <UserDashboard />
    </div>
  );
};




