import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`mb-4 p-2 md:px-4 md:py-3 text-sm rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
      }`}
    >
      {theme === "dark" ? (
        <FiSun className="inline mx-2" />
      ) : (
        <FiMoon className="inline mx-2" />
      )}
      {/* You can add text here: Switch to {theme === "dark" ? "Light" : "Dark"} Mode */}
    </button>
  );
};

export default ThemeToggle;
