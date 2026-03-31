import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Student.css";

const Assignments: React.FC = () => {
  const navigate = useNavigate();
  const [showBox, setShowBox] = useState(false);
  const [code, setCode] = useState("");

  const handleOpenGroup = (title: string, groupId: string) => {
    navigate("/student/assignments/group", {
      state: { title, groupId },
    });
  };

  return (
    <div className="student-assignment-page">
      <Navbar variant="student" />
      
      <div className="student-assignment-content">
        {/* MAIN CONTAINER */}
        <div className="student-assignment-container vi-card vi-card-orange">

          <div className="student-assignment-header">
            <div className="student-left-section">
              <h1>Assignments</h1>
              <p>View and submit your assignments</p>
            </div>

            <div className="student-right-section">
              <button
                className="vi-btn vi-btn-secondary"
                onClick={() => setShowBox(!showBox)}
              >
                Join Assignment Group
              </button>

              <button
                className="vi-btn vi-btn-outline"
                onClick={() => navigate("/student/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Input Box */}
          {showBox && (
            <div className="student-join-box">
              <input
                type="text"
                className="vi-input"
                placeholder="Enter Group Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button className="vi-btn vi-btn-primary">
                Join
              </button>
            </div>
          )}
        </div>

        {/* GROUP CONTAINER */}
        <div className="student-group-section">
          <h2 className="section-title">Your Groups</h2>

          <div className="student-group-cards">

            {/* Card 1 */}
            <div
              className="student-group-card vi-card vi-card-teal"
              onClick={() => handleOpenGroup("React Basics", "GRP123")}
            >
              <h3>React Basics</h3>

              <p className="student-group-id">
                Group ID: GRP123
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="student-group-card vi-card vi-card-teal"
              onClick={() => handleOpenGroup("JavaScript Quiz", "GRP456")}
            >
              <h3>JavaScript Quiz</h3>

              <p className="student-group-id">
                Group ID: GRP456
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Assignments;