import React, { useState } from 'react';
import '../../Styles/surveyor.css';
import { FaUserPlus, FaTrashAlt,FaCopy} from 'react-icons/fa'; // Import the necessary icons

const Surveyor = () => {
  // Dummy data for Surveyors
  const initialSurveyors = [
    { name: 'John Doe', lastActivity: '21/11/2024', id: 1 },
    { name: 'Alice Smith', lastActivity: '20/11/2024', id: 2 },
    { name: 'Bob Johnson', lastActivity: '20/11/2024', id: 3 },
    { name: 'Charlie Davis', lastActivity: '19/11/2024', id: 4 },
    { name: 'David Clark', lastActivity: '21/11/2024', id: 5 },
    { name: 'Eve Williams', lastActivity: '22/11/2024', id: 6 },
    { name: 'Frank Wilson', lastActivity: '20/11/2024', id: 7 },
    { name: 'Grace Lee', lastActivity: '18/11/2024', id: 8 },
    { name: 'Helen White', lastActivity: '16/11/2024', id: 9 },
    { name: 'Ivy Harris', lastActivity: '21/11/2024', id: 10 },
  ];

  const [surveyors, setSurveyors] = useState(initialSurveyors); // State to manage the surveyor list
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for the delete modal
  const [showShareModal, setShowShareModal] = useState(false); // State for the share modal
  const [selectedSurveyor, setSelectedSurveyor] = useState(null); // State to track the selected surveyor for modal

  // Function to handle sharing a surveyor's details
  const handleShare = (surveyor) => {
    setSelectedSurveyor(surveyor); // Set the selected surveyor for sharing
    setShowShareModal(true); // Show the share modal
  };

  // Function to handle opening the delete confirmation modal
  const handleDelete = (surveyor) => {
    setSelectedSurveyor(surveyor); // Set the selected surveyor to delete
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  // Function to confirm deletion of a surveyor
  const confirmDelete = () => {
    setSurveyors(surveyors.filter((surveyor) => surveyor.id !== selectedSurveyor.id)); // Remove the surveyor from the list
    setShowDeleteModal(false); // Close the delete modal
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false); // Close the delete modal
  };

  // Function to close the share modal
  const closeShareModal = () => {
    setShowShareModal(false); // Close the share modal
    setSelectedSurveyor(null); // Clear the selected surveyor
  };
  const copyToClipboard = () => {
    const link = `https://example.com/share/${selectedSurveyor.id}`;
    navigator.clipboard.writeText(link); // Copy the link to the clipboard
    alert('Link copied to clipboard!');
  };
  return (
    <div className="surveyor-table">
     <div className="form-header">
        <div className="left-header">
          <h2>Survey / Dashboard</h2>
        </div>
        </div>
      <table>
        <thead>
          <tr>
            <th>Surveyor Name</th>
            <th>Last Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveyors.map((surveyor) => (
            <tr key={surveyor.id}>
              <td>{surveyor.name}</td>
              <td>{surveyor.lastActivity}</td>
              <td>
                {/* Share button */}
                <FaUserPlus className="action-icon" onClick={() => handleShare(surveyor)} title='Share' />
                {/* Delete button */}
                <FaTrashAlt className="action-icon" onClick={() => handleDelete(surveyor)} title='Delete'/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="surveyor-modal">
          <div className="surveyor-content">
            <h4>Are you sure you want to delete this surveyor?</h4>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}

{showShareModal && selectedSurveyor && (
        <div className="surveyor-modal">
          <div className="surveyor-content">
           
            <p>
              <strong>Shareable Link:</strong>
              <input
                type="text"
                value={`https://example.com/share/${selectedSurveyor.name}`}
                readOnly
                id="shareLink"
                className="share-link-box"
              />
              <button onClick={copyToClipboard} className="copy-btn">
                <FaCopy /> Copy
              </button>
              <button onClick={closeShareModal}>Close</button>
            </p>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Surveyor;
