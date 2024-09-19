// InterviewDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./InterviewDetail.css";

function InterviewDetail() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [rounds, setRounds] = useState([]);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    // Fetch interview detail by ID (mock data used here for illustration)
    setInterview({
      title: "TCS",
      time: "10:00 AM",
      roundStatus: "Completed",
      result: "Selected",
    });

    // Fetch rounds (mock data used here for illustration)
    setRounds([
      {
        name: "Technical Round",
        duration: "30 minutes",
        timeToStart: "10:30 AM",
      },
      { name: "HR Round", duration: "20 minutes", timeToStart: "11:00 AM" },
    ]);
  }, [id]);

  if (!interview) {
    return <p>Loading...</p>;
  }

  const enterRound = () => {
    navigate("/mcq"); // Navigate to the MCQ page
  };

  return (
    <div className="interview-detail">
      <div className="interview-info">
        <h2>{interview.title}</h2>
        <p>Job Role: Software Engineer</p>
        <p>No of Round Completed: 0/5</p>
        <p>Result: -:-</p>
      </div>
      <div className="rounds-container">
        {rounds.map((round, index) => (
          <div key={index} className="round-card">
            <h4>{round.name}</h4>
            <p>Duration: {round.duration}</p>
            <p>Time to Start: {round.timeToStart}</p>
            <div className="round-card-footer">
              <button className="enter-round-button" onClick={enterRound}>
                Enter Round
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewDetail;
