import React from "react";
import "./index.css";

const Header = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <header className="header">
      {/* Go Back Button */}
      <button className="go-back-button" onClick={handleGoBack}>
        <span className="arrow">←</span>
        <span className="text">Go Back</span>
      </button>

      {/* Logo */}
      <img
        src="/Logo.jpg" // Ensure the logo path is correct
        alt="Logo"
        className="logo"
      />
    </header>
  );
};

export default Header;
