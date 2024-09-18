import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  // Sample interviews data (replace with dynamic data as needed)
  const interviews = [
    { id: 1, company: 'Company A', time: '10:00 AM' },
    { id: 2, company: 'Company B', time: '1:00 PM' },
    { id: 3, company: 'Company C', time: '3:00 PM' },
    // Add more interviews as needed
  ];

  return (
    <div className="home-page">
      <div className="profile-section">
        <img src="path-to-profile-picture.jpg" alt="Profile" className="profile-photo" />
        <h2>Your Profile</h2>
        <p>Name: John Doe</p>
        <p>Position: Software Developer</p>
        {/* Add more profile details as needed */}
      </div>
      <div className="main-content">
        <h2>Interviews</h2>
        <p>Here are the interviews you have applied for:</p>
        <div className="interview-list">
          {interviews.map(interview => (
            <Link to={`/interview/${interview.id}`} key={interview.id} className="interview-card">
              <h3>{interview.company}</h3>
              <p>Time: {interview.time}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
