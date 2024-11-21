import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/responses.css";

const Responses = () => {
  const navigate = useNavigate();

  const [forms] = useState([
    {
      id: 1,
      title: "Building Survey Form",
      questions: [
        "What is the name or ID of the building?",
        "What type of building is this? (Residential, Commercial, etc.)",
        "What is the current usage of the building? (Occupied, Vacant, Under Construction)",
        "How many floors does the building have?",
        "What is the primary construction material? (Concrete, Wood, etc.)",
        "What is the condition of the building? (Good, Moderate, Poor)",
        "Are there any notable features? (e.g., Heritage, Solar Panels)"
      ],
      responses: [
        {
          buildingId: "B123",
          type: "Residential",
          usage: "Occupied",
          floors: 5,
          material: "Concrete",
          condition: "Good",
          features: "Solar Panels"
        }
      ]
    },
    {
      id: 2,
      title: "Road Survey Form",
      questions: [
        "What is the name or ID of the road?",
        "What type of road is this? (Highway, Street, Pathway, etc.)",
        "What is the road surface material? (Asphalt, Concrete, etc.)",
        "What is the width of the road (in meters)?",
        "Is there a presence of footpaths? (Yes/No)",
        "What is the condition of the road? (Good, Needs Repairs, Poor)",
        "Is the road prone to flooding? (Yes/No)"
      ],
      responses: [
        {
          roadId: "R456",
          type: "Highway",
          material: "Asphalt",
          width: 15,
          footpaths: "Yes",
          condition: "Good",
          flooding: "No"
        }
      ]
    },
    {
        id: 3,
        title: "Road Survey Form",
        questions: [
          "What is the name or ID of the road?",
          "What type of road is this? (Highway, Street, Pathway, etc.)",
          "What is the road surface material? (Asphalt, Concrete, etc.)",
          "What is the width of the road (in meters)?",
          "Is there a presence of footpaths? (Yes/No)",
          "What is the condition of the road? (Good, Needs Repairs, Poor)",
          "Is the road prone to flooding? (Yes/No)"
        ],
        responses: [
          {
            roadId: "R456",
            type: "Highway",
            material: "Asphalt",
            width: 15,
            footpaths: "Yes",
            condition: "Good",
            flooding: "No"
          }
        ]
      }
  ]);

  const handleViewResponses = (form) => {
    navigate(`/form-details`, { state: form });
  };

  return (
    <div className="responses-container">
    <div className="form-header">
        <div className="left-header">
          <h2>Survey / Responses</h2>
        </div>
        </div>
      <div className="forms-list">
        {forms.map((form) => (
          <div className="form-card" key={form.id}>
            <h2 className="form-title">{form.title}</h2>
            <ul className="questions-list">
              {form.questions.map((question, index) => (
                <li key={index} className="question-item">
                  {question}
                </li>
              ))}
            </ul>
            <button
              className="view-responses-btn"
              onClick={() => handleViewResponses(form)}
            >
              View Responses
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
