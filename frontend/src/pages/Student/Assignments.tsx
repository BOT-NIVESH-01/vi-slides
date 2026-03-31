import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import {
  getAssignmentsRequest,
  joinAssignmentGroupRequest,
  type AssignmentItem,
} from "../../lib/api";
import "./Student.css";

const Assignments: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [showBox, setShowBox] = useState(false);
  const [code, setCode] = useState("");
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinMessage, setJoinMessage] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const fetchAssignmentsData = async (authToken: string) => {
    const data = await getAssignmentsRequest(authToken);
    setAssignments(data);
    setError(null);
  };

  useEffect(() => {
    async function loadAssignments() {
      if (!token) {
        setError("Please login again to view assignments.");
        setLoading(false);
        return;
      }

      try {
        await fetchAssignmentsData(token);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load assignments";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadAssignments();
  }, [token]);

  const handleJoinGroup = async () => {
    if (!token) {
      setJoinMessage("Please login again to continue.");
      return;
    }

    if (!code.trim()) {
      setJoinMessage("Please enter a valid group code.");
      return;
    }

    setJoining(true);
    setJoinMessage(null);

    try {
      const message = await joinAssignmentGroupRequest(code.trim().toUpperCase(), token);
      setJoinMessage(message);
      setCode("");
      await fetchAssignmentsData(token);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to join assignment group";
      setJoinMessage(message);
    } finally {
      setJoining(false);
    }
  };

  const handleOpenAssignment = (assignmentId: string) => {
    navigate("/student/assignments/detail", {
      state: { assignmentId },
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
              <button className="vi-btn vi-btn-primary" onClick={() => void handleJoinGroup()} disabled={joining}>
                {joining ? "Joining..." : "Join"}
              </button>
              {joinMessage && <p className="student-group-id">{joinMessage}</p>}
            </div>
          )}
        </div>

        {/* GROUP CONTAINER */}
        <div className="student-group-section">
          <h2 className="section-title">Available Assignments</h2>

          <div className="student-group-cards">
            {loading ? (
              <div className="student-group-card vi-card vi-card-teal">
                <h3>Loading assignments...</h3>
              </div>
            ) : error ? (
              <div className="student-group-card vi-card vi-card-teal">
                <h3>Unable to load assignments</h3>
                <p className="student-group-id">{error}</p>
              </div>
            ) : assignments.length === 0 ? (
              <div className="student-group-card vi-card vi-card-teal">
                <h3>No assignments available</h3>
                <p className="student-group-id">Check back later for new work.</p>
              </div>
            ) : (
              assignments.map((assignment) => (
                <div
                  className="student-group-card vi-card vi-card-teal"
                  onClick={() => handleOpenAssignment(assignment._id)}
                  key={assignment._id}
                >
                  <h3>{assignment.title}</h3>

                  <p className="student-group-id">
                    Max Marks: {assignment.maxMarks}
                  </p>
                  <p className="student-group-id">
                    Group ID: {assignment.groupId}
                  </p>
                  <p className="student-group-id">
                    Deadline: {new Date(assignment.deadline).toLocaleString()}
                  </p>
                  {assignment.referenceUrl && (
                    <a href={assignment.referenceUrl} target="_blank" rel="noreferrer" className="student-group-id">
                      Reference Link
                    </a>
                  )}
                </div>
              ))
            )}

          </div>
        </div>
      </div>

    </div>
  );
};

export default Assignments;