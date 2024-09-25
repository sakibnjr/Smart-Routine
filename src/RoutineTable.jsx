import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FaQuestionCircle, FaDownload } from "react-icons/fa"; // Importing icons from React Icons

const RoutineTable = () => {
  const routineData = [
    {
      date: "28th September",
      course: "Compiler Design",
      room: "TBA",
      time: "2:00 PM",
      examDate: new Date("2024-09-28T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/0FNM7438QC#uPOCHjSpSSRf",
    },
    {
      date: "30th September",
      course: "Software Engineering",
      room: "TBA",
      time: "2:00 PM",
      examDate: new Date("2024-09-30T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/XN8S7XCFX0#TEZyRkCiRbzR",
    },
    {
      date: "2nd October",
      course: "Computer Architecture",
      room: "TBA",
      time: "2:00 PM",
      examDate: new Date("2024-10-02T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/RQGWGTWF4M#eHh2SReR2VFo",
    },
    {
      date: "6th October",
      course: "Information Security",
      room: "TBA",
      time: "2:00 PM",
      examDate: new Date("2024-10-06T14:00:00"),
      previousQuestionsLink:
        "https://drive.proton.me/urls/EYS9GH3PFR#sh0VAC4ihWL0",
    },
    {
      date: "9th October",
      course: "Big Data and IoT",
      room: "TBA",
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

  return (
    <div className="container mx-auto p-6">
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
        className="text-center mb-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white"
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
        <table className="table w-full text-center shadow-xl rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border-separate border-spacing-0">
          <thead>
            <tr className="text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              <th className="p-2 md:p-4">Date</th>
              <th className="p-2 md:p-4">Course Name</th>
              <th className="p-2 md:p-4">Time</th>
              <th className="p-2 md:p-4">Room Number</th>
              <th className="p-2 md:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routineData.map((item, index) => (
              <motion.tr
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`border-b transition-all duration-500 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } `}
              >
                <td className="p-2 md:p-4 text-sm md:text-base">{item.date}</td>
                <td className="p-2 md:p-4 text-sm md:text-base font-semibold text-blue-800">
                  {item.course}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base">{item.time}</td>
                <td className="p-2 md:p-4 text-sm md:text-base">TBA</td>
                <td className="p-2 md:p-4 space-x-2">
                  {/* Previous Questions Button */}
                  <button
                    className="btn btn-sm btn-accent"
                    onClick={() =>
                      handlePreviousQuestionsClick(item.previousQuestionsLink)
                    } // Pass the link directly
                  >
                    {isMobile ? <FaQuestionCircle /> : "Previous Questions"}
                  </button>
                  {/* Download All Slides Button */}
                  {/* <button className="btn btn-sm btn-accent">
                    {isMobile ? <FaDownload /> : "Download Slides"}
                  </button> */}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <a
        href="https://drive.google.com/uc?id=14r3ItldmuHJBhCX8O2o2sb9wLoeYFel9"
        className="flex justify-center items-center btn btn-outline my-4"
      >
        Download Routine
      </a>

      {/* <Button /> */}
    </div>
  );
};

export default RoutineTable;
