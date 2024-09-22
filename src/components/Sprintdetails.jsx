import React, { useState } from 'react';

const Sprintdetails = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [appName, setAppName] = useState('');
  const [releaseNumber, setReleaseNumber] = useState('');

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

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    togglePopup();
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-6 h-30">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 p-4 flex justify-center items-center"
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

        {/* Second Column: Display Uploaded Image */}
        <div className="border-2 border-gray-300 p-4 flex justify-center items-center">
          {imageSrc ? (
            <img src={imageSrc} alt="Uploaded" className="max-h-64 object-contain" />
          ) : (
            <p className="text-gray-500">No image uploaded</p>
          )}
        </div>
      </div>

      {/* Below Row: Production Pipeline Releases Table */}
      <div className="bg-white shadow-md rounded p-4 relative">
        <h2 className="text-xl font-bold mb-4">Production Pipeline Releases</h2>
        <button
          className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={togglePopup}
        >
          Add Production
        </button>
        <table className="w-full text-left table-auto mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">App</th>
              <th className="px-4 py-2">Release Numbers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Court Web App</td>
              <td className="border px-4 py-2">#20240912.11</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Court Standalone App – iOS</td>
              <td className="border px-4 py-2">Version 1.0.19</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Interpreter App - iOS</td>
              <td className="border px-4 py-2">Version 1.0.28</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Interpreter App – Android</td>
              <td className="border px-4 py-2">Version 1.0.24</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Interpreter App – Windows</td>
              <td className="border px-4 py-2">Not released</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Interpreter App – Web App</td>
              <td className="border px-4 py-2">Released</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Production</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Release Number</label>
                <input
                  type="text"
                  value={releaseNumber}
                  onChange={(e) => setReleaseNumber(e.target.value)}
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
                  Submit
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
