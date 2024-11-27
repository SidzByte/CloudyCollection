import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MainNav = () => {
  let navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div
        style={{
          position: "fixed",        // Keeps the nav fixed on the page
          top: "20px",              // Distance from the top of the page
          left: "20px",             // Distance from the left of the page
          backgroundColor: "#ffffff", // Background for better visibility
          padding: "20px",          // Adds padding around content
          borderRadius: "8px",      // Rounded corners
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
          display: "flex",          // Flexbox layout for alignment
          flexDirection: "column",  // Align items vertically
          alignItems: "flex-start", // Aligns items to the left
          gap: "15px",              // Spacing between elements
          width: "220px",           // Set a fixed width for consistency
        }}
      >
        {/* User Greeting */}
        <p
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            margin: 0,
            color: "#333", // Subtle text color
          }}
        >
          Hello, {localStorage.getItem("userName")}!
        </p>

        {/* Logout Button */}
        <button
          onClick={logoutHandler}
          style={{
            backgroundColor: "#ff4d4d", // Eye-catching logout button
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Logout
        </button>

        <hr style={{ width: "100%", border: "0.5px solid #ddd" }} />

        {/* Navigation Links */}
        <Link
          to="/dashboard/category"
          style={{
            textDecoration: "none",
            color: "#007bff",
            fontSize: "14px",
          }}
        >
          Collection List
        </Link>
        <Link
          to="/dashboard/add-category"
          style={{
            textDecoration: "none",
            color: "#007bff",
            fontSize: "14px",
          }}
        >
          Add New Collection
        </Link>
      </div>
    </>
  );
};

export default MainNav;
