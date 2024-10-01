import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

const Sprintdetails = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [richText, setRichText] = useState(''); 
  const [blockers, setBlockers] = useState([]);
  const [selectedBlocker, setSelectedBlocker] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchBlockers();
  }, []);

  const fetchBlockers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Blockers/blockers/');
      const data = await response.json();
      setBlockers(data);
    } catch (error) {
      console.error('Error fetching blockers:', error);
    }
  };

  const createBlocker = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Blockers/blockers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: richText }),
      });
      const newBlocker = await response.json();
      setBlockers((prevBlockers) => [...prevBlockers, newBlocker]);
      togglePopup();
      setRichText(''); // Reset rich text field after submission
    } catch (error) {
      console.error('Error creating blocker:', error);
    }
  };

  const updateBlocker = async (blockerId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Blockers/blockers/${blockerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: richText }),
      });
      const updatedBlocker = await response.json();
      setBlockers((prevBlockers) =>
        prevBlockers.map((blocker) =>
          blocker.blocker_id === updatedBlocker.blocker_id ? updatedBlocker : blocker
        )
      );
      togglePopup();
      setRichText(''); // Reset rich text field after submission
    } catch (error) {
      console.error('Error updating blocker:', error);
    }
  };

  const deleteBlocker = async (blockerId) => {
    try {
      await fetch(`http://127.0.0.1:8000/Blockers/blockers/${blockerId}`, {
        method: 'DELETE',
      });
      setBlockers((prevBlockers) => prevBlockers.filter((blocker) => blocker.blocker_id !== blockerId));
    } catch (error) {
      console.error('Error deleting blocker:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBlocker) {
      updateBlocker(selectedBlocker.blocker_id);
    } else {
      createBlocker();
    }
  };

  const handleEdit = (blocker) => {
    setSelectedBlocker(blocker);
    setRichText(blocker.description); 
    setShowPopup(true); 
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setSelectedBlocker(null);
      setRichText(''); 
    }
  };

  return (
    <div className="p-4">
      {/* Image Upload Section */}
      {!imageSrc ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-blue-300 p-4 flex justify-center items-center mb-4"
        >
          <div className="text-center">
            <p className="mb-2 text-gray-500">Drag and drop an image or</p>
            <label className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-blue-300 p-4 mb-4 flex justify-center items-center">
          <img src={imageSrc} alt="Uploaded" className="max-h-64 object-contain" />
          <button
            className="absolute bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => alert('Image saved!')}
          >
            Save
          </button>
        </div>
      )}

      {/* Blockers Table */}
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Blockers</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={togglePopup}
          >
            Add Blocker
          </button>
        </div>
        <table className="w-full text-left table-auto mt-4">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-4 py-2">SL No</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
          {blockers.map((blocker, index) => ( /* Using index to generate serial number */
              <tr key={blocker.blocker_id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2" style={{ whiteSpace: 'pre-wrap' }}>
                  <div dangerouslySetInnerHTML={{ __html: blocker.description }} />
                </td>
                <td className="border px-4 py-2">
                  <i 
                    className="fa-solid fa-edit cursor-pointer text-green-500 mr-2" 
                    onClick={() => handleEdit(blocker)}
                    title="Edit Blocker"
                  ></i>
                  <i 
                    className="fa-solid fa-trash cursor-pointer text-red-500" 
                    onClick={() => deleteBlocker(blocker.blocker_id)} 
                    title="Delete Blocker"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Form with Rich Text Editor */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {selectedBlocker ? 'Edit Blocker' : 'Add Blocker'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <ReactQuill
                  theme="snow"
                  value={richText}
                  onChange={setRichText}
                  className="mb-4"
                  placeholder="Enter blocker description..."
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
                  {selectedBlocker ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sprintdetails;
