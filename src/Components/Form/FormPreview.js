// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import "../../Styles/formpreview.css";

// function FormPreview() {
//   const location = useLocation();
//   const sections = location.state || [];
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [formName, setFormName] = useState('');


//   const noSectionQuestions = sections.filter((section) => !section.sectionTitle)?.flatMap((section) => section.questions || []);
//   const sectionedQuestions = sections.filter((section) => section.sectionTitle);

//   const hasSectionedQuestions = sectionedQuestions.length > 0;

//   const currentSection = hasSectionedQuestions ? sectionedQuestions[currentSectionIndex] : null;


//   const getNextSectionIndex = (index) => {
//     let nextIndex = index;
//     while (nextIndex < sectionedQuestions.length && !sectionedQuestions[nextIndex]?.questions?.length) {
//       nextIndex++;
//     }
//     return nextIndex;
//   };


//   const handleNext = (event) => {
//     event.preventDefault(); // Prevent form submission
//     const nextIndex = getNextSectionIndex(currentSectionIndex + 1);
//     if (nextIndex < sectionedQuestions.length) {
//       setCurrentSectionIndex(nextIndex);
//     }
//   };

//   const handleBack = (event) => {
//     event.preventDefault(); // Prevent form submission
//     if (currentSectionIndex > 0) {
//       setCurrentSectionIndex(currentSectionIndex - 1);
//     }
//   };



//   // Check if it's the last section
//   const isLastSection = currentSectionIndex === sectionedQuestions.length - 1;

//   const isSinglePage = noSectionQuestions.length > 0 && !hasSectionedQuestions;
//   const handleCancel = () => {
//     setFormName(''); // Reset the form name
//     console.log('Form creation canceled');
//   };

//   // Function to handle saving the form name
//   const handleSaveFormName = () => {
//     if (!formName.trim()) {
//       alert('Form name cannot be empty!');
//       return;
//     }
//     console.log('Form name saved:', formName);
//     // You can also implement further actions like saving to the backend
//   };

//   return (

//     <div className="bg">
//       <div className="form-preview">
//         <h3>{formName}</h3>
//         <form>
//         <div className="form-name-input">
//         <label htmlFor="formName">Form Name</label>
//         <input
//           type="text"
//           id="formName"
//           placeholder="Enter the name of your form"
//           value={formName}
//           onChange={(e) => setFormName(e.target.value)} // Assuming `formName` and `setFormName` are in your state
//         />
//       </div>

     
//       <div className="navigation-buttons">
//         <button type="button" className="preview-buttons" onClick={handleCancel}>
//           Cancel
//         </button>
//         <button type="button" className="preview-buttons" onClick={handleSaveFormName}>
//           Save Form Name
//         </button>
//       </div>
//           {currentSectionIndex === 0 && noSectionQuestions.length > 0 && (
//             <div className="no-section-questions">
//               {/* <h4>Questions</h4> */}
//               {noSectionQuestions.map((question, index) => (
//                 <div key={index} className="preview-question">
//                   <p>
//                     {question.questionText}
//                     {question.required && <span className="required-star"> *</span>}
//                   </p>
//                   {/* Question types */}
//                   {question.questionType === "shortAnswer" && (
//                     <input type="text" placeholder="Short answer" required={question.required} />
//                   )}
//                   {question.questionType === "paragraph" && (
//                     <textarea placeholder="Long answer" required={question.required} />
//                   )}
//                   {question.questionType === "multipleChoice" &&
//                     question.options.map((option, i) => (
//                       <label key={i}>
//                         <input type="radio" name={`q-${index}`} required={question.required} /> {option}
//                       </label>
//                     ))}
//                   {question.questionType === "checkbox" &&
//                     question.options.map((option, i) => (
//                       <label key={i}>
//                         <input type="checkbox" required={question.required} /> {option}
//                       </label>
//                     ))}
//                   {question.questionType === "dropdown" && (
//                     <select required={question.required}>
//                       {question.options.map((option, i) => (
//                         <option key={i} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                   {question.questionType === "date" && <input type="date" />}
//                   {question.questionType === "time" && <input type="time" />}
//                   {question.questionType === "fileUpload" && (
//                     <input type="file" required={question.required} />
//                   )}

//                   {/* Validation Rules */}
//                   {question.validation && (
//                     <div className="validation-rule">
//                       <div className="short">
//                         {question.validation.type === "selectAtMost" && `Select at most ${question.validation.value}`}
//                         {question.validation.type === "selectAtLeast" && `Select at least ${question.validation.value}`}
//                         {question.validation.type === "selectExactly" && `Select exactly ${question.validation.value}`}
//                       </div>
//                       {question.questionType === "multipleChoice" && question.validation.message && (
//                         <div>{question.validation.message}</div>
//                       )}
//                       {question.questionType === "dropdown" && question.validation.message && (
//                         <div className="short">{question.validation.message}</div>
//                       )}
//                       {question.questionType === "fileUpload" && (
//                         <div className="short">
//                           {question.validation.allowedFileTypes && (
//                             <div>Allowed file types: {question.validation.allowedFileTypes.join(", ")}</div>
//                           )}
//                           {question.validation.maxFiles && <div>Maximum files: {question.validation.maxFiles}</div>}
//                           {question.validation.maxFileSize && (
//                             <div>Maximum file size: {question.validation.maxFileSize} MB</div>
//                           )}
//                         </div>
//                       )}
//                       {(question.questionType === "shortAnswer" || question.questionType === "paragraph") && (
//                         <div className="short">
//                           {question.validation.minLength && <div>Minimum Length: {question.validation.minLength}</div>}
//                           {question.validation.maxLength && <div>Maximum Length: {question.validation.maxLength}</div>}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {hasSectionedQuestions && currentSection && (
//             <div className="section-questions">
//               <h4>{currentSection.sectionTitle}</h4>
//               {currentSection.questions?.map((question, index) => (
//                 <div key={index} className="preview-question">
//                   <p>
//                     {question.questionText}
//                     {question.required && <span className="required-star"> *</span>}
//                   </p>
//                   {/* Repeat same logic here for questions and validation */}
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="navigation-buttons">
//             {currentSectionIndex > 0 && (
//               <button type="button" className="preview-buttons" onClick={handleBack}>
//                 Back
//               </button>
//             )}
//             {isSinglePage || isLastSection ? (
//               <button type="submit" className="preview-buttons">
//                 Submit
//               </button>
//             ) : (
//               <button type="button" className="preview-buttons" onClick={handleNext}>
//                 Next
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );

// }

// export default FormPreview;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/formpreview.css";

function FormPreview() {
  const location = useLocation();
  const sections = location.state || [];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formName, setFormName] = useState('');
  const [isEditing, setIsEditing] = useState(true); // To toggle between edit and view modes

  const noSectionQuestions = sections.filter((section) => !section.sectionTitle)?.flatMap((section) => section.questions || []);
  const sectionedQuestions = sections.filter((section) => section.sectionTitle);

  const hasSectionedQuestions = sectionedQuestions.length > 0;
  const currentSection = hasSectionedQuestions ? sectionedQuestions[currentSectionIndex] : null;

  const getNextSectionIndex = (index) => {
    let nextIndex = index;
    while (nextIndex < sectionedQuestions.length && !sectionedQuestions[nextIndex]?.questions?.length) {
      nextIndex++;
    }
    return nextIndex;
  };

  const handleNext = (event) => {
    event.preventDefault();
    const nextIndex = getNextSectionIndex(currentSectionIndex + 1);
    if (nextIndex < sectionedQuestions.length) {
      setCurrentSectionIndex(nextIndex);
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const isLastSection = currentSectionIndex === sectionedQuestions.length - 1;
  const isSinglePage = noSectionQuestions.length > 0 && !hasSectionedQuestions;

  const handleCancel = () => {
    setFormName('');
    setIsEditing(true); // Return to edit mode when canceled
    console.log('Form creation canceled');
  };

  const handleSaveFormName = () => {
    if (!formName.trim()) {
      alert('Form name cannot be empty!');
      return;
    }
    console.log('Form name saved:', formName);
    setIsEditing(false); // Switch to view mode after saving
  };

  const handleEditFormName = () => {
    setIsEditing(true); // Switch back to edit mode when editing
  };

  return (
    <div className="bg">
      <div className="form-preview">
        {isEditing ? (
          <>
            <h3>{formName || "Untitled Form"}</h3>
            <form>
              <div className="form-name-input">
              
                <input
                  type="text"
                  id="formName"
                  placeholder="Enter the name of your form"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="navigation-buttons">
                <button type="button" className="preview-buttons" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="button" className="preview-buttons" onClick={handleSaveFormName}>
                  Save 
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="form-name-display">
            <h3>{formName}</h3>
            <button type="button" className="preview-buttons" onClick={handleEditFormName}>
              Edit Title
            </button>
          </div>
        )}

{currentSectionIndex === 0 && noSectionQuestions.length > 0 && (
            <div className="no-section-questions">
              {/* <h4>Questions</h4> */}
              {noSectionQuestions.map((question, index) => (
                <div key={index} className="preview-question">
                  <p>
                    {question.questionText}
                    {question.required && <span className="required-star"> *</span>}
                  </p>
                  {/* Question types */}
                  {question.questionType === "shortAnswer" && (
                    <input type="text" placeholder="Short answer" required={question.required} />
                  )}
                  {question.questionType === "paragraph" && (
                    <textarea placeholder="Long answer" required={question.required} />
                  )}
                  {question.questionType === "multipleChoice" &&
                    question.options.map((option, i) => (
                      <label key={i}>
                        <input type="radio" name={`q-${index}`} required={question.required} /> {option}
                      </label>
                    ))}
                  {question.questionType === "checkbox" &&
                    question.options.map((option, i) => (
                      <label key={i}>
                        <input type="checkbox" required={question.required} /> {option}
                      </label>
                    ))}
                  {question.questionType === "dropdown" && (
                    <select required={question.required}>
                      {question.options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {question.questionType === "date" && <input type="date" />}
                  {question.questionType === "time" && <input type="time" />}
                  {question.questionType === "fileUpload" && (
                    <input type="file" required={question.required} />
                  )}

                  {/* Validation Rules */}
                  {question.validation && (
                    <div className="validation-rule">
                      <div className="short">
                        {question.validation.type === "selectAtMost" && `Select at most ${question.validation.value}`}
                        {question.validation.type === "selectAtLeast" && `Select at least ${question.validation.value}`}
                        {question.validation.type === "selectExactly" && `Select exactly ${question.validation.value}`}
                      </div>
                      {question.questionType === "multipleChoice" && question.validation.message && (
                        <div>{question.validation.message}</div>
                      )}
                      {question.questionType === "dropdown" && question.validation.message && (
                        <div className="short">{question.validation.message}</div>
                      )}
                      {question.questionType === "fileUpload" && (
                        <div className="short">
                          {question.validation.allowedFileTypes && (
                            <div>Allowed file types: {question.validation.allowedFileTypes.join(", ")}</div>
                          )}
                          {question.validation.maxFiles && <div>Maximum files: {question.validation.maxFiles}</div>}
                          {question.validation.maxFileSize && (
                            <div>Maximum file size: {question.validation.maxFileSize} MB</div>
                          )}
                        </div>
                      )}
                      {(question.questionType === "shortAnswer" || question.questionType === "paragraph") && (
                        <div className="short">
                          {question.validation.minLength && <div>Minimum Length: {question.validation.minLength}</div>}
                          {question.validation.maxLength && <div>Maximum Length: {question.validation.maxLength}</div>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {hasSectionedQuestions && currentSection && (
            <div className="section-questions">
              <h4>{currentSection.sectionTitle}</h4>
              {currentSection.questions?.map((question, index) => (
                <div key={index} className="preview-question">
                  <p>
                    {question.questionText}
                    {question.required && <span className="required-star"> *</span>}
                  </p>
                  {/* Repeat same logic here for questions and validation */}
                </div>
              ))}
            </div>
          )}

          <div className="navigation-buttons">
            {currentSectionIndex > 0 && (
              <button type="button" className="preview-buttons" onClick={handleBack}>
                Back
              </button>
            )}
            {isSinglePage || isLastSection ? (
              <button type="submit" className="preview-buttons">
                Submit
              </button>
            ) : (
              <button type="button" className="preview-buttons" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
      </div>
    </div>
  );
}

export default FormPreview;
