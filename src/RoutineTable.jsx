import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuDownload } from "react-icons/lu"; // Importing icons from React Icons
import { FiSun, FiMoon } from "react-icons/fi"; // Importing sun and moon icons
import { GoQuestion } from "react-icons/go";
import { GrChapterPrevious } from "react-icons/gr";
import { FaCalendarAlt, FaClock, FaBook } from "react-icons/fa";

const RoutineTable = () => {
  const [theme, setTheme] = useState("light"); // State for theme

  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const routineData = [
    {
      date: "28th September",
      course: "Compiler Design",
      rooms: [
        { number: "208", capacity: 18 },
        { number: "213", capacity: 24 },
        { number: "216", capacity: 10 },
      ],
      time: "2:00 PM",
      examDate: new Date("2024-09-28T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/0FNM7438QC#uPOCHjSpSSRf",
    },
    {
      date: "30th September",
      course: "Software Engineering",
      rooms: [
        { number: "208", capacity: 18 },
        { number: "213", capacity: 24 },
        { number: "216", capacity: 10 },
      ],
      time: "2:00 PM",
      examDate: new Date("2024-09-30T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/XN8S7XCFX0#TEZyRkCiRbzR",
    },
    {
      date: "2nd October",
      course: "Computer Architecture",
      rooms: [
        { number: "208", capacity: 18 },
        { number: "213", capacity: 24 },
        { number: "216", capacity: 10 },
      ],
      time: "2:00 PM",
      examDate: new Date("2024-10-02T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/RQGWGTWF4M#eHh2SReR2VFo",
    },
    {
      date: "6th October",
      course: "Information Security",
      rooms: [
        { number: "305", capacity: 16 },
        { number: "306", capacity: 24 },
        { number: "307", capacity: 13 },
      ],
      time: "2:00 PM",
      examDate: new Date("2024-10-06T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/EYS9GH3PFR#sh0VAC4ihWL0",
    },
    {
      date: "9th October",
      course: "Big Data and IoT",
      rooms: [
        { number: "208", capacity: 18 },
        { number: "213", capacity: 24 },
        { number: "216", capacity: 10 },
      ],
      time: "11:30 AM",
      examDate: new Date("2024-10-09T11:30:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/SDFK6D920C#4yrIVBVIJ1hB",
    },
  ];

  // Check for user's system theme preference
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(userPrefersDark ? "dark" : "light");
  }, []);

  // Update the body class based on the theme
  useEffect(() => {
    document.body.className = theme; // Set body class for global styles
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Update Timer and other methods...
  const updateTimer = () => {
    const now = new Date();
    const examDate = routineData[currentExamIndex].examDate;
    const timeDifference = examDate - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    } else {
      if (currentExamIndex < routineData.length - 1) {
        setCurrentExamIndex(currentExamIndex + 1);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentExamIndex]);

  const handlePreviousQuestionsClick = (link) => {
    window.open(link, "_blank"); // Open the link in a new tab
  };

  const getRoomColor = (capacity, highestCapacity, lowestCapacity) => {
    if (capacity === highestCapacity) {
      return "bg-green-500"; // Green for highest capacity
    }
    if (capacity === lowestCapacity) {
      return "bg-red-500"; // Red for lowest capacity
    }
    return "bg-blue-500"; // Blue for medium capacity
  };

  return (
    <div
      className={`container mx-auto p-6 rounded-lg relative ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between">
        <motion.h1
          className="text-3xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Exam Routine
        </motion.h1>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`mb-4 p-2 md:px-4 md:py-3 text-sm rounded-lg shadow-md ${
            theme === "dark"
              ? "bg-gray-100 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          {theme === "dark" ? (
            <FiSun className="inline mx-2" />
          ) : (
            <FiMoon className="inline mx-2" />
          )}
          {/* Switch to {theme === "dark" ? "Light" : "Dark"} Mode */}
        </button>
      </div>

      <motion.div
        className="text-center mb-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Icon with spinning effect */}
        <motion.div className="flex">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            --- Upcoming Exam ---
            <span className="text-rose-500 ml-2">
              {routineData[currentExamIndex].course}
            </span>
          </h2>
        </motion.div>

        {/* Countdown text with pulsating animation */}
        <motion.p
          className="text-lg md:text-xl mt-2 text-white flex justify-center items-center"
          animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
          // transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaClock size={30} className="mr-2 text-yellow-300" />
          {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
          {timeRemaining.seconds}s
        </motion.p>

        {/* Animated Book Icon with Bouncing Effect */}
        <motion.div
          className="flex justify-center items-center mt-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaBook size={30} className="text-green-300 mr-2" />
          <p className="text-white">Prepare Well!</p>
        </motion.div>
      </motion.div>

      {/* Table */}
      <motion.div
        className="overflow-x-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <table className="table w-full text-center shadow-xl bg-gray-800 border-separate border-spacing-0">
          <thead>
            <tr
              className={`${
                theme === "dark"
                  ? "text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
                  : "text-black bg-gray-300"
              }`}
            >
              <th className="p-2 md:p-4">Date</th>
              <th className="p-2 md:p-4">Course Name</th>
              <th className="p-2 md:p-4">Time</th>
              <th className="p-2 md:p-4">Room Number</th>
              <th className="p-2 md:p-4">Capacity</th>
              <th className="p-2 md:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routineData.map((item, index) => {
              // Calculate highest and lowest capacities for room highlighting
              const capacities = item.rooms.map((room) => room.capacity);
              const highestCapacity = Math.max(...capacities);
              const lowestCapacity = Math.min(...capacities);

              return (
                <motion.tr
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`border-b transition-all duration-500 ${
                    theme === "dark"
                      ? index % 2 === 0
                        ? "bg-gray-700"
                        : "bg-gray-600"
                      : index % 2 === 0
                      ? "bg-gray-100"
                      : "bg-gray-200"
                  }`}
                >
                  <td className="p-2 md:p-4 text-sm md:text-base">
                    {item.date}
                  </td>
                  <td className="p-2 md:p-4 text-sm md:text-base font-semibold text-blue-400">
                    {item.course}
                  </td>
                  <td className="p-2 md:p-4 text-sm md:text-base">
                    {item.time}
                  </td>
                  <td className="p-2 md:p-4 text-sm md:text-base">
                    {item.rooms.map((room, roomIndex) => (
                      <div
                        key={roomIndex}
                        className={`inline-block p-1 rounded ${getRoomColor(
                          room.capacity,
                          highestCapacity,
                          lowestCapacity
                        )}`}
                      >
                        {room.number}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 md:p-4">
                    {item.rooms.map((room, roomIndex) => (
                      <div
                        key={roomIndex}
                        className={`inline-block p-1 rounded ${getRoomColor(
                          room.capacity,
                          highestCapacity,
                          lowestCapacity
                        )}`}
                      >
                        {room.capacity}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 md:p-4">
                    <button
                      className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                      onClick={() =>
                        handlePreviousQuestionsClick(item.previousQuestionsLink)
                      }
                    >
                      <GrChapterPrevious className="mr-2" />
                      Questions
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      <a
        href="https://drive.google.com/uc?id=1J5025fwMkgOwskJ3rZo0kyIFHhstfaba"
        className={`flex justify-center items-center btn btn-outline my-4 ${
          theme === "dark" ? "dark:btn-neutral text-white" : "text-black"
        }`}
      >
        Download Routine
        <LuDownload className="ml-2" />
      </a>
    </div>
  );
};

export default RoutineTable;
