import React from "react";

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className={isDarkMode ? "btn btn-light btn-sm" : "btn btn-dark btn-sm"}
      aria-pressed={!isDarkMode}
      aria-label={isDarkMode ? "Activate light mode" : "Activate dark mode"}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
