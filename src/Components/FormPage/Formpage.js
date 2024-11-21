import React, { useState } from 'react';
import '../../Styles/formpage.css';
import { FaSortAlphaDown, FaGoogleDrive, FaFile, FaEllipsisV } from 'react-icons/fa'; // Import required icons
import { Link, useNavigate } from 'react-router-dom'; // Import necessary hooks

const FormPage = () => {
  const [filter, setFilter] = useState('ownedByMe');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const navigate = useNavigate();

  // Dummy list of files
  const files = [
    { name: 'Survey A', owner: 'John', size: '1.2MB', type: 'PDF', date: '2024-11-15' },
    { name: 'Survey B', owner: 'Alice', size: '3.4MB', type: 'Word', date: '2024-11-16' },
    { name: 'Survey C', owner: 'John', size: '2.0MB', type: 'Excel', date: '2024-11-17' },
    { name: 'Survey D', owner: 'Bob', size: '1.7MB', type: 'PDF', date: '2024-11-18' },
    { name: 'Survey E', owner: 'Alice', size: '2.8MB', type: 'Word', date: '2024-11-19' },
  ];

  // Filter files based on ownership
  const filteredFiles = files.filter(file =>
    filter === 'ownedByMe' ? file.owner === 'John' : file.owner !== 'John'
  );

  // Sort files alphabetically
  const sortedFiles = [...filteredFiles].sort((a, b) => a.name.localeCompare(b.name));

  // Function to handle file selection
  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  // Open modal for file actions (Rename/Remove)
  const handleThreeDotsClick = (file) => {
    setCurrentFile(file);  // Set the file to show options for
    setShowModal(true);
  };

  // Handle file actions (Rename/Remove)
  const handleRename = () => {
    alert(`Rename file: ${currentFile.name}`);
    setShowModal(false);
  };

  const handleRemove = () => {
    alert(`Remove file: ${currentFile.name}`);
    setShowModal(false);
  };

  // Modal for file options (Rename/Remove)
  const renderModal = () => {
    if (!showModal) return null;
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Options for {currentFile.name}</h3>
          <button onClick={handleRename}>Rename</button>
          <button onClick={handleRemove}>Remove</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    );
  };

  // Function to navigate to the folder page
  const handleFolderClick = (folderName) => {
    navigate(`/survey/folder/${folderName}`);
  };

  return (
    <div className="form-page">
      {/* Header */}
      <div className="form-header">
        <div className="left-header">
          <h2>Survey / Forms</h2>
        </div>
        <div className="right-header">
          <FaSortAlphaDown className="form-icon" onClick={() => console.log('Sort files alphabetically')} />
          <FaGoogleDrive className="form-icon" onClick={() => window.open('https://drive.google.com', '_blank')} />
          <select className="filter-dropdown" onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="ownedByMe">Owned by me</option>
            <option value="ownedByAnyone">Owned by anyone</option>
          </select>
        </div>
      </div>

      {/* File Folders Section */}
      <div className="file-section">
        {/* Left Side - Files */}
        <div className="file-list">
          <h3>Files</h3>
          <div className="folder-container">
            {sortedFiles.map((file, index) => (
              <div
                key={index}
                className="file-item"
                onClick={() => handleFileClick(file)} // File selection
              >
                <FaFile className="file-icon" />
                <span>{file.name}</span>
                <span className="date">{file.date}</span>
                <FaEllipsisV
                  className="options-icon"
                  onClick={(e) => { e.stopPropagation(); handleThreeDotsClick(file); }} // Prevent folder click
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - File Details */}
        <div className="file-details">
          {selectedFile ? (
            <>
              <h3>File Details</h3>
              <p><strong>Name:</strong> {selectedFile.name}</p>
              <p><strong>Owner:</strong> {selectedFile.owner}</p>
              <p><strong>Size:</strong> {selectedFile.size}</p>
              <p><strong>Type:</strong> {selectedFile.type}</p>
              <p><strong>Date Created:</strong> {selectedFile.date}</p>
            </>
          ) : (
            <p>Please select a file to see the details.</p>
          )}
        </div>
      </div>

      {/* Render Modal */}
      {renderModal()}
    </div>
  );
};

export default FormPage;
