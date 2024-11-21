// import React, { useState, useRef, useEffect } from 'react';
// import { FaBell, FaQuestionCircle, FaUserCircle, FaComments, FaInfoCircle } from 'react-icons/fa';
// import '../../Styles/navbar.css';
// import { Link } from 'react-router-dom';
// import Header from '../Header/Header';
// import ConfirmationPopup from './SignOut';
// import '../../Styles/navbar.css';
// const Navbar = () => {
//   const [selectedPage, setSelectedPage] = useState('');
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [showHelp, setShowHelp] = useState(false);
//   const helpRef = useRef();
//   const confirmationRef = useRef();

//   const helpPopupRef = useRef(null);
//   const toggleHelpPopup = () => {
//     setShowHelp((prev) => {
//       if (!prev) setShowConfirmation(false);
//       return !prev;
//     });
//   };

//   const toggleConfirmationPopup = () => {
//     setShowConfirmation((prev) => {
//       if (!prev) setShowHelp(false);
//       return !prev;
//     });
//   };

//   const handleConfirmSignOut = () => {
//     setShowConfirmation(false);
//   };

//   const handleCancelSignOut = () => {
//     setShowConfirmation(false);
//   };


//   const handleOutsideClick = (event) => {


//     if (helpPopupRef.current && !helpPopupRef.current.contains(event.target)) {
//       setShowHelp(false);
//     }


//     if (showConfirmation && confirmationRef.current && !confirmationRef.current.contains(event.target)) {
//       setShowConfirmation(false);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [showConfirmation, showHelp]);
//   return (
//     <div >
//       <div className="navbar">
//         <div className="navbar-left">
//         <Link to="/dashboard">
//           <span
//             onClick={() => setSelectedPage('dashboard')}
//             className={`nav-link ${selectedPage === 'dashboard' ? 'active' : ''}`}
//           >
//             Dashboard
//           </span>
//           </Link>
//           <Link to="/createform">
//             <span
//               onClick={() => setSelectedPage('form')}
//               className={`nav-link ${selectedPage === 'form' ? 'active' : ''}`}
//             >
//             Forms
//             </span>
//           </Link>
//           <Link to="/surveyor">
//           <span
//             onClick={() => setSelectedPage('surveyor')}
//             className={`nav-link ${selectedPage === 'surveyor' ? 'active' : ''}`}
//           >
//             Surveyors
//           </span>
//           </Link>
//           <span
//             onClick={() => setSelectedPage('gis')}
//             className={`nav-link ${selectedPage === 'gis' ? 'active' : ''}`}
//           >
//             Responses
//           </span>
         
//         </div>

//         <div className="navbar-right">
//           <FaComments className="icon" title="Messages" />
//           <FaInfoCircle className="icon" title="Help Center" onClick={toggleHelpPopup} />
//           <FaUserCircle
//             className="icon"
//             title="User Profile"
//             onClick={toggleConfirmationPopup}
//           />
//         </div>
//       </div>

//       <Header selectedPage={selectedPage} />

//       {showConfirmation && (
//         <div ref={confirmationRef}>
//           <ConfirmationPopup
//             message="Are you sure you want to end your session?"
//             onConfirm={handleConfirmSignOut}
//             onCancel={handleCancelSignOut}
//           />
//         </div>
//       )}

//       {showHelp && (
//         <div className="help-popup" ref={helpRef}>
//           <div className="help-popup-content">
//             <h3>Need Assistance?</h3>
//             <p>For any questions or support, please reach out to our team:</p>
//             <p>
//               <strong>Frontend Developer (UI):</strong> +91 9876543210
//             </p>
//             <p>
//               <strong>Backend Developer (API/Server):</strong> +91 9123456780
//             </p>
//             <p>We are here to assist you with any technical or project-related concerns.</p>
//             <button onClick={toggleHelpPopup} className="help-popup-close-button">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaQuestionCircle, FaUserCircle, FaComments, FaInfoCircle } from 'react-icons/fa';
import '../../Styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import ConfirmationPopup from './SignOut';

const Navbar = () => {
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const helpPopupRef = useRef(null);
  const profileMenuRef = useRef(null);
  const confirmationRef = useRef(null);

  const toggleHelpPopup = () => {
    setShowHelp((prev) => {
      if (!prev) setShowConfirmation(false);
      return !prev;
    });
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => {
      if (!prev) {
        setShowHelp(false);
        setShowConfirmation(false);
      }
      return !prev;
    });
  };

  const handleConfirmSignOut = () => {
    setShowConfirmation(false);
    alert('You have been logged out.');
    // Perform logout logic here
  };

  const handleCancelSignOut = () => {
    setShowConfirmation(false);
  };

  const handleOutsideClick = (event) => {
    if (helpPopupRef.current && !helpPopupRef.current.contains(event.target)) {
      setShowHelp(false);
    }
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
    if (confirmationRef.current && !confirmationRef.current.contains(event.target)) {
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showConfirmation, showHelp, showProfileMenu]);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/dashboard">
            <span
              onClick={() => setSelectedPage('dashboard')}
              className={`nav-link ${selectedPage === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </span>
          </Link>
          <Link to="/createform">
            <span
              onClick={() => setSelectedPage('form')}
              className={`nav-link ${selectedPage === 'form' ? 'active' : ''}`}
            >
              Forms
            </span>
          </Link>
          <Link to="/surveyor">
            <span
              onClick={() => setSelectedPage('surveyor')}
              className={`nav-link ${selectedPage === 'surveyor' ? 'active' : ''}`}
            >
              Surveyors
            </span>
          </Link>
          <Link to="/responses">
          <span
            onClick={() => setSelectedPage('gis')}
            className={`nav-link ${selectedPage === 'gis' ? 'active' : ''}`}
          >
            Responses
          </span>
          </Link>
        </div>

        <div className="navbar-right">
          <FaComments className="icon" title="Messages" />
          <FaInfoCircle className="icon" title="Help Center" onClick={toggleHelpPopup} />
          <div className="profile-container">
            <FaUserCircle
              className="icon"
              title="User Profile"
              onClick={toggleProfileMenu}
            />
            {showProfileMenu && (
              <div className="profile-menu" ref={profileMenuRef}>
                <div
                  className="profile-menu-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/profile'); 
                  }}
                >
                  Profile Info
                </div>
                <div className='line'></div>
                <div
                  className="profile-menu-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    
                    setShowConfirmation(true);
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Header selectedPage={selectedPage} />

      {showConfirmation && (
        <div ref={confirmationRef}>
          <ConfirmationPopup
            message="Are you sure you want to end your session?"
            onConfirm={handleConfirmSignOut}
            onCancel={handleCancelSignOut}
          />
        </div>
      )}

      {showHelp && (
        <div className="help-popup" ref={helpPopupRef}>
          <div className="help-popup-content">
            <h3>Need Assistance?</h3>
            <p>For any questions or support, please reach out to our team:</p>
            <p>
              <strong>Frontend Developer (UI):</strong> +91 9876543210
            </p>
            <p>
              <strong>Backend Developer (API/Server):</strong> +91 9123456780
            </p>
            <p>We are here to assist you with any technical or project-related concerns.</p>
            <button onClick={toggleHelpPopup} className="help-popup-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
