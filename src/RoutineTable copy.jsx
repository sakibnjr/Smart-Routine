import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { LuDownload } from "react-icons/lu"; // Importing icons from React Icons

const RoutineTable = () => {
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

  const [currentExamIndex, setCurrentExamIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" }); // Media query to detect mobile view

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

  // Function to determine the room color based on capacity
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
    <div className="container mx-auto p-6 bg-gray-900 text-gray-200">
      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Exam Routine
      </motion.h1>

      {/* Timer Section */}
      <motion.div
        className="text-center mb-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold">
          Next Exam: {routineData[currentExamIndex].course}
        </h2>
        <p className="text-lg md:text-xl mt-2">
          Time Remaining: {timeRemaining.days}d {timeRemaining.hours}h{" "}
          {timeRemaining.minutes}m {timeRemaining.seconds}s
        </p>
      </motion.div>

      {/* Table */}
      <motion.div
        className="overflow-x-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <table className="table w-full text-center shadow-xl rounded-lg bg-gray-800 border-separate border-spacing-0">
          <thead>
            <tr className="text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
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
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                  } `}
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
                        className="text-sm md:text-base font-semibold"
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
                      <LuDownload className="mr-2" /> Download
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default RoutineTable;
