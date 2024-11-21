import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Styles/form.css';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineCopy, AiOutlineCheckCircle } from 'react-icons/ai';
function FormBuilder() {
  const [sections, setSections] = useState([{ sectionTitle: "", questions: [] }]);
  const [useSections, setUseSections] = useState(false);
  const [draggedQuestion, setDraggedQuestion] = useState(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState(null);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationSettings, setValidationSettings] = useState({
    sectionIndex: null,
    questionIndex: null,
    questionType: null,
    rules: {}
  });

  const handleValidation = (sectionIndex, questionIndex, questionType) => {
    setShowValidationPopup(true);
    setValidationSettings({
      sectionIndex,
      questionIndex,
      questionType,
      rules: {}
    });
  };
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    questionType: "shortAnswer",
    options: [],
  });
  const [currentOption, setCurrentOption] = useState("");
  const [required, setRequired] = useState(false);
  const addSection = () => {
    setUseSections(true);
    const sectionNumber = sections.length + 0;
    setSections([
      ...sections,
      { sectionTitle: `Section ${sectionNumber}`, questions: [] }
    ]);
    setCurrentSectionIndex(sections.length);
  };

  const navigate = useNavigate();
  const deleteQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.splice(questionIndex, 1);
    setSections(updatedSections);
  };

  const editQuestion = (sectionIndex, questionIndex) => {
    setCurrentQuestion(sections[sectionIndex].questions[questionIndex]);
    deleteQuestion(sectionIndex, questionIndex);
  };

  const duplicateQuestion = (sectionIndex, questionIndex) => {
    const questionToDuplicate = sections[sectionIndex].questions[questionIndex];
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions.push({ ...questionToDuplicate });
    setSections(updatedSections);
  };

  const toggleRequired = (sectionIndex, questionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions[questionIndex].required =
      !updatedSections[sectionIndex].questions[questionIndex].required;
    setSections(updatedSections);
  };

  const handleOptionEdit = (e, index) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = e.target.value;
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions
    });
  };


  const removeOption = (index) => {
    const updatedOptions = currentQuestion.options.filter((_, i) => i !== index);
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions
    });
  };


  const hasQuestions = sections.some(section => section.questions.length > 0);
  const handleQuestionTextChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionText: e.target.value,
    });
  };
  const handleQuestionTypeChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionType: e.target.value,
      options: [],
    });
  };

  const handleOptionChange = (e) => {
    setCurrentOption(e.target.value);
  };

  const addOption = () => {
    if (currentOption.trim()) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, currentOption],
      });
      setCurrentOption('');
    }
  };

  const handleRequiredChange = () => {
    setRequired(!required);
  };

  const addQuestion = () => {
    if (useSections) {
      const updatedSections = [...sections];
      updatedSections[currentSectionIndex].questions.push({ ...currentQuestion, required });
      setSections(updatedSections);
    } else {
      const updatedSections = [{ sectionTitle: "", questions: [...sections[0].questions, { ...currentQuestion, required }] }];
      setSections(updatedSections);
    }
    setCurrentQuestion({ questionText: '', questionType: 'shortAnswer', options: [] });
    setCurrentOption('');
    setRequired(false);
  };



  const handleSectionTitleChange = (e) => {
    const updatedSections = [...sections];
    updatedSections[currentSectionIndex].sectionTitle = e.target.value;
    setSections(updatedSections);
  };


  const handleCreateForm = () => {

    window.open('/form-preview', '_blank');
  };
  const handleDragStart = (sectionIndex, questionIndex) => {
    setDraggedQuestion({ sectionIndex, questionIndex });
  };

  const handleDragOver = (e, sectionIndex, questionIndex) => {
    e.preventDefault();
    setDraggedOverIndex({ sectionIndex, questionIndex });
  };

  const handleDrop = () => {
    if (draggedQuestion && draggedOverIndex) {
      const updatedSections = [...sections];
      const { sectionIndex: fromSectionIndex, questionIndex: fromQuestionIndex } = draggedQuestion;
      const { sectionIndex: toSectionIndex, questionIndex: toQuestionIndex } = draggedOverIndex;

      const [movedQuestion] = updatedSections[fromSectionIndex].questions.splice(fromQuestionIndex, 1);
      updatedSections[toSectionIndex].questions.splice(toQuestionIndex, 0, movedQuestion);

      setSections(updatedSections);
      setDraggedQuestion(null);
      setDraggedOverIndex(null);
    }
  };
  const saveValidationRules = () => {
    const { sectionIndex, questionIndex, rules } = validationSettings;
    const updatedSections = [...sections];
    updatedSections[sectionIndex].questions[questionIndex].validation = rules;
    setSections(updatedSections);
    setShowValidationPopup(false);
  };
  const validateAnswers = (answers) => {
    for (let section of sections) {
      for (let question of section.questions) {
        const { validation, questionType } = question;
        const answer = answers[question.id];

        if (questionType === "multipleChoice" || questionType === "dropdown") {
          if (validation?.message && Array.isArray(answer) && answer.length > 1) {
            return validation.message;
          }
        }

        if (questionType === "fileUpload") {
          if (validation?.maxFiles && answer?.length > validation.maxFiles) {
            return `You can upload a maximum of ${validation.maxFiles} files.`;
          }
          if (
            validation?.maxFileSize &&
            answer?.some((file) => file.size / 1024 / 1024 > validation.maxFileSize)
          ) {
            return `File size should not exceed ${validation.maxFileSize} MB.`;
          }
          if (
            validation?.allowedFileTypes &&
            answer?.some((file) => !validation.allowedFileTypes.includes(file.type))
          ) {
            return `Only the following file types are allowed: ${validation.allowedFileTypes.join(", ")}.`;
          }
        }
      }
    }
    return null;
  };


  return (
    <div className="form-screen-container">
      <div className="form-builder-container">
        <h3>Create a New Survey</h3>


        {useSections && (
          <input
            type="text"
            placeholder="Section Title"
            value={sections[currentSectionIndex].sectionTitle}
            onChange={handleSectionTitleChange}
            className="section-title-input"
          />
        )}
        <div className="question-container">
          <input
            type="text"
            placeholder="Enter your question"
            value={currentQuestion.questionText}
            onChange={handleQuestionTextChange}
            className="question-input"
          />
          <select
            value={currentQuestion.questionType}
            onChange={handleQuestionTypeChange}
            className="question-type-select"
          >
            <option value="shortAnswer">Short Answer</option>
            <option value="paragraph">Paragraph</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="checkbox">Checkbox</option>
            <option value="dropdown">Dropdown</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="fileUpload">File Upload</option>
          </select>

          {(currentQuestion.questionType === 'multipleChoice' ||
            currentQuestion.questionType === 'checkbox' ||
            currentQuestion.questionType === 'dropdown') && (
              <div className="options-container">
                <input
                  type="text"
                  placeholder="Enter option"
                  value={currentOption}
                  onChange={handleOptionChange}
                  className="option-input"
                />
                <button onClick={addOption} className="add-option-btn">
                  <AiOutlinePlus />
                </button>
              </div>
            )}


          {currentQuestion.options.length > 0 && (
            <div className="options-list">
              <h5>Entered Options:</h5>
              <ul>
                {currentQuestion.options.map((option, index) => (
                  <li key={index}>
                    <input
                      // type="text"
                      value={option}
                      onChange={(e) => handleOptionEdit(e, index)}
                      className="option-input"
                    />
                    <button onClick={() => removeOption(index)} className="remove-option-btn">
                      <AiOutlineDelete />
                    </button>

                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="add-buttons-container">
            <button onClick={addQuestion} className="add-question-btn">
              Add Question
            </button>
            <button onClick={addSection} className="add-question-btn">
              Add Section
            </button>
          </div>
        </div>




        {hasQuestions && (
          <div className="preview">
            <h4>Preview</h4>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="preview-section">
                {useSections && <h5>{section.sectionTitle}</h5>}
                {section.questions.map((q, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="preview-question"
                    draggable
                    onDragStart={() => handleDragStart(sectionIndex, questionIndex)}
                    onDragOver={(e) => handleDragOver(e, sectionIndex, questionIndex)}
                    onDrop={handleDrop}
                  >
                    <p>{q.questionText}</p>

                    {q.questionType === "shortAnswer" && <input type="text" placeholder="Short answer" />}

                    {q.questionType === "paragraph" && <textarea placeholder="Long answer" />}

                    {q.questionType === "multipleChoice" && (
                      q.options.map((opt, i) => (
                        <label key={i}>
                          <input type="radio" name={`mcq-${sectionIndex}-${questionIndex}`} /> {opt}
                        </label>
                      ))
                    )}

                    {q.questionType === "checkbox" && (
                      q.options.map((opt, i) => (
                        <label key={i}>
                          <input type="checkbox" /> {opt}
                        </label>
                      ))
                    )}

                    {q.questionType === "dropdown" && (
                      <select>
                        {q.options.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {q.questionType === "date" && <input type="date" />}

                    {q.questionType === "time" && <input type="time" />}

                    {q.questionType === "fileUpload" && <input type="file" />}


                    {q.validation && (
                      <div className="validation-rule">
                        <div className="short">
                          {q.validation.type === "selectAtMost" && `Select at most ${q.validation.value}`}
                          {q.validation.type === "selectAtLeast" && `Select at least ${q.validation.value}`}
                          {q.validation.type === "selectExactly" && `Select exactly ${q.validation.value}`}
                        </div>
                        {q.questionType === "multipleChoice" && q.validation.message && (
                          <div>{q.validation.message}</div>
                        )}
                        {q.questionType === "dropdown" && q.validation.message && (
                          <div className="short">{q.validation.message}</div>
                        )}

                        {q.questionType === "fileUpload" && (
                          <div className="short">
                            {q.validation.allowedFileTypes && (
                              <div>Allowed file types: {q.validation.allowedFileTypes.join(", ")}</div>
                            )}
                            {q.validation.maxFiles && <div>Maximum files: {q.validation.maxFiles}</div>}
                            {q.validation.maxFileSize && <div>Maximum file size: {q.validation.maxFileSize} MB</div>}
                          </div>
                        )}
                        {q.questionType === "shortAnswer" && (
                          <div className="short">
                            {q.validation.minLength && <div>Minimum Length: {q.validation.minLength}</div>}
                            {q.validation.maxLength && <div>Maximum Length: {q.validation.maxLength} </div>}
                          </div>
                        )}
                        {q.questionType === "paragraph" && (
                          <div className="short">
                            {q.validation.minLength && <div>Minimum Length: {q.validation.minLength}</div>}
                            {q.validation.maxLength && <div>Maximum Length: {q.validation.maxLength} </div>}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="line-separate"></div>


                    <div className="question-actions">
                      <button onClick={() => editQuestion(sectionIndex, questionIndex)} className="edit-btn">
                        <AiOutlineEdit />
                      </button>
                      <button onClick={() => deleteQuestion(sectionIndex, questionIndex)} className="delete-btn">
                        <AiOutlineDelete />
                      </button>
                      <button onClick={() => duplicateQuestion(sectionIndex, questionIndex)} className="duplicate-btn">
                        <AiOutlineCopy />
                      </button>
                      {q.questionType !== "date" && q.questionType !== "time" && (
                        <button
                          onClick={() => handleValidation(sectionIndex, questionIndex, q.questionType)}
                          className="validate-btn"
                        >
                          <AiOutlineCheckCircle />
                        </button>
                      )}
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={q.required}
                          onChange={() => toggleRequired(sectionIndex, questionIndex)}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="toggle-label">{q.required ? "Required" : "Optional"}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}


          </div>
        )}
        {showValidationPopup && (
          <div className="validation-popup">
            <div className="popup-content">
              <h4>Response Validation</h4>
              {/* <h4>Set Validation for {validationSettings.questionType}</h4> */}


              {validationSettings.questionType === "checkbox" && (
                <>
                  <label>Validation Type:</label>
                  <select
                    value={validationSettings.rules.type || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, type: e.target.value }
                      }))
                    }
                  >
                    <option value="selectAtMost">Select at most</option>
                    <option value="selectAtLeast">Select at least</option>
                    <option value="selectExactly">Select exactly</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Enter number"
                    value={validationSettings.rules.value || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, value: parseInt(e.target.value, 10) }
                      }))
                    }
                  />
                </>
              )}

              {/* Short Answer Validation */}
              {validationSettings.questionType === "shortAnswer" && (
                <>
                  <label>Minimum Length:</label>
                  <input
                    type="number"
                    placeholder="Min characters"
                    value={validationSettings.rules.minLength || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, minLength: parseInt(e.target.value, 10) }
                      }))
                    }
                  />
                  <label>Maximum Length:</label>
                  <input
                    type="number"
                    placeholder="Max characters"
                    value={validationSettings.rules.maxLength || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, maxLength: parseInt(e.target.value, 10) }
                      }))
                    }
                  />
                </>
              )}
              {validationSettings.questionType === "paragraph" && (
                <>
                  <label>Minimum Length:</label>
                  <input
                    type="number"
                    placeholder="Min characters"
                    value={validationSettings.rules.minLength || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, minLength: parseInt(e.target.value, 10) }
                      }))
                    }
                  />
                  <label>Maximum Length:</label>
                  <input
                    type="number"
                    placeholder="Max characters"
                    value={validationSettings.rules.maxLength || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, maxLength: parseInt(e.target.value, 10) }
                      }))
                    }
                  />
                </>
              )}

              {validationSettings.questionType === "fileUpload" && (
                <>
                  <label>Allowed File Types:</label>
                  <select
                    multiple
                    value={validationSettings.rules.allowedFileTypes || []}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: {
                          ...prev.rules,
                          allowedFileTypes: Array.from(e.target.selectedOptions, (option) => option.value)
                        }
                      }))
                    }
                  >
                    <option type="checkbox" value="document">Document</option>
                    <option value="presentation">Presentation</option>
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                  </select>

                  <label>Maximum Number of Files:</label>
                  <input
                    type="number"
                    placeholder="Enter maximum file count"
                    value={validationSettings.rules.maxFiles || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, maxFiles: parseInt(e.target.value, 10) }
                      }))
                    }
                  />

                  <label>Maximum File Size (in MB):</label>
                  <input
                    type="number"
                    placeholder="Enter max file size"
                    value={validationSettings.rules.maxFileSize || ""}
                    onChange={(e) =>
                      setValidationSettings((prev) => ({
                        ...prev,
                        rules: { ...prev.rules, maxFileSize: parseInt(e.target.value, 10) }
                      }))
                    }
                  />
                </>
              )}


              {(validationSettings.questionType === "multipleChoice" ||
                validationSettings.questionType === "dropdown") && (
                  <>
                    <label>Validation Message:</label>
                    <input
                      placeholder="Enter validation message"
                      value={validationSettings.rules.message || ""}
                      onChange={(e) =>
                        setValidationSettings((prev) => ({
                          ...prev,
                          rules: { ...prev.rules, message: e.target.value }
                        }))
                      }
                    />
                  </>
                )}

              <div className="popup-buttons">
                <button onClick={saveValidationRules} className="save-validation-btn">Save</button>
                <button onClick={() => setShowValidationPopup(false)} className="close-popup-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}



        <button onClick={handleCreateForm} className="create-form-btn">Create Form</button>
      </div>
    </div>
  );
}

export default FormBuilder;
