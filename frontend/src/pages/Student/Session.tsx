import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Student.css";

const Session: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sessionCode = location.state?.sessionCode;

  if (!sessionCode) {
    return (
      <div className="student-session-page">
        <Navbar variant="student" />
        <div className="student-session-error">
          <h2>No session found</h2>
          <button className="vi-btn vi-btn-primary" onClick={() => navigate("/student/dashboard")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-session-page">
      <Navbar variant="student" />
      
      <div className="student-session-content">
        {/* Top Bar */}
        <div className="student-session-header vi-card">
          <div>
            <span className="student-live">LIVE SESSION</span>
            <h3>Session: {sessionCode}</h3>
          </div>

          <div className="student-session-actions">
            <div className="student-code-box">CODE {sessionCode}</div>
            <button
              className="vi-btn vi-btn-outline student-leave-btn"
              onClick={() => navigate("/student/dashboard")}
            >
              Leave
            </button>
          </div>
        </div>

        {/* Feeling Buttons */}
        <div className="student-feeling-section vi-card vi-card-teal">
          <h3>How are you feeling?</h3>
          <div className="student-feeling-buttons">
            <button>Lost</button>
            <button>Ok</button>
            <button className="student-active">Got it</button>
          </div>

          <button className="vi-btn vi-btn-primary">Raise Hand</button>
        </div>

        {/* Question Box */}
        <div className="student-question-box">
          <input type="text" className="vi-input" placeholder="Ask a question..." />
          <button className="vi-btn vi-btn-primary">Send Question</button>
        </div>

        <div className="student-question-count">Question 0 of 0</div>
      </div>
    </div>
  );
};

export default Session;