import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/responses.css";

const FormDetails = () => {
  const location = useLocation();
  const form = location.state;

  // State to track the row being edited and the updated data
  const [editIndex, setEditIndex] = useState(null);
  const [updatedResponses, setUpdatedResponses] = useState(form.responses);

  // Handle clicking the edit button
  const handleEditClick = (index) => {
    setEditIndex(index); // Set the index of the row being edited
  };

  // Handle clicking the save button
  const handleSaveClick = () => {
    setEditIndex(null); // Exit editing mode
    // You can send the `updatedResponses` to the backend here
    console.log("Updated Responses:", updatedResponses);
  };

  // Handle input change in editable rows
  const handleInputChange = (index, key, value) => {
    const updatedData = [...updatedResponses];
    updatedData[index][key] = value; // Update the specific field
    setUpdatedResponses(updatedData);
  };

  // Handle deleting a row
  const handleDeleteClick = (index) => {
    const updatedData = updatedResponses.filter((_, i) => i !== index);
    setUpdatedResponses(updatedData);
  };

  return (
    <div className="form-details-container">
      <div className="form-header">
        <div className="left-header">
          <h2>Survey / Surveyor Responses</h2>
        </div>
      </div>
      <table className="responses-table">
        <thead>
          <tr>
            {Object.keys(form.responses[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th> {/* Add a column for actions */}
          </tr>
        </thead>
        <tbody>
          {updatedResponses.map((response, index) => (
            <tr key={index}>
              {Object.entries(response).map(([key, value], i) => (
                <td key={i}>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleInputChange(index, key, e.target.value)
                      }
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => handleDeleteClick(index)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteClick(index)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormDetails;
