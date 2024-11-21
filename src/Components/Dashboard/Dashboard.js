import React from 'react';
import '../../Styles/dashboard.css'; // Your CSS for styling
import { Link } from 'react-router-dom';

// Card component to represent each dashboard item
const DashboardCard = ({ title, description, link, icon }) => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
      <Link to={link} className="card-link">View Details</Link>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
         <div className="form-header">
        <div className="left-header">
          <h2>Survey / Dashboard</h2>
        </div>
        </div>
      <div className="dashboard-cards">
        {/* Example of a card for recent submissions */}
        <DashboardCard
          title="Recent Submission"
          description="View the latest form submissions and their statuses."
          link="/submissions" // Link to detailed page
          icon="📝" // Icon for the card
        />

        {/* Card for pending forms */}
        <DashboardCard
          title="Pending Forms"
          description="Manage the forms that are currently pending approval."
          link="/pending-forms"
          icon="⏳"
        />

        {/* Card for form statistics */}
        <DashboardCard
          title="Form Stats"
          description="Get insights and statistics about the forms submitted."
          link="/form-stats"
          icon="📊"
        />
        
        {/* Card for notifications */}
        <DashboardCard
          title="Notifications"
          description="View the latest updates and important notifications."
          link="/notifications"
          icon="🔔"
        />
      </div>
    </div>
  );
};

export default Dashboard;
