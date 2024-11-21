// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../Styles/header.css';

// const Header = ({ selectedPage }) => {
//   const navigate = useNavigate();

//   const renderSearchContainer = () => {
//     switch (selectedPage) {
//       case 'dashboard':
//         return <input type="text" placeholder="Search Dashboard..." className="search-input" />;
//       case 'form':
//         return <input type="text" placeholder="Search Forms..." className="search-input" />;
//       case 'gis':
//         return <input type="text" placeholder="Search GIS Map..." className="search-input" />;
//       case 'surveyor':
//         return <input type="text" placeholder="Search Surveyor..." className="search-input" />;
//       default:
//         return <input type="text" placeholder="Search..." className="search-input" />;
//     }
//   };

//   return (
//     <div className="header">
//       <div className="search-container">{renderSearchContainer()}</div>
//     </div>
//   );
// };

// export default Header;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/header.css';

const Header = ({ selectedPage, handleLimitChange, limit }) => {
  const navigate = useNavigate();
  const handleCreateNewForm = () => {
    navigate('/form-builder');
  };
  const renderSearchContainer = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <input type="text" placeholder="Search Dashboard..." className="search-input" />;
      case 'form':
        return <input type="text" placeholder="Search Forms..." className="search-input" />;
      case 'gis':
        return <input type="text" placeholder="Search Responses..." className="search-input" />;
      case 'surveyor':
        return <input type="text" placeholder="Search Surveyor..." className="search-input" />;
      default:
        return <input type="text" placeholder="Search..." className="search-input" />;
    }
  };

  return (
    <div className="header">
      {/* Left Section: + New Form Button */}
      {selectedPage === 'form' && (
        <div className="form-structure">
          <button onClick={handleCreateNewForm} className="create-form-button">
            + New Form
          </button>
        </div>
      )}

      {/* Middle Section: Search Container */}
      <div className="search-container">{renderSearchContainer()}</div>

      {/* Right Section: Sort Dropdown */}
      {selectedPage === 'form' && (
        <div className="sort-container">
          <span className="sort-label">Show:</span>
          <select onChange={handleLimitChange} value={limit} className="limit-dropdown">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={60}>60</option>
            <option value={80}>80</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Header;
