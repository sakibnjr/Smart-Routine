import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuDownload } from "react-icons/lu";
import ThemeToggle from "./components/ThemeToggle";
import ExamCountdown from "./components/ExamCountdown";
import ExamRoutineTable from "./components/ExamRoutineTable";
import RoutineCard from "./components/RoutineCard";

const RoutineTable = () => {
  const [theme, setTheme] = useState("light");
  const [currentExamIndex, setCurrentExamIndex] = useState(0);

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

  // Detect system theme preference
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(userPrefersDark ? "dark" : "light");
  }, []);

  // Update body class for theme
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`container mx-auto p-6 rounded-lg relative ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Header and Theme Toggle */}
      <div className="flex justify-between">
        <motion.h1
          className="text-3xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Exam Routine
        </motion.h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Countdown */}
      <ExamCountdown
        currentExamIndex={currentExamIndex}
        setCurrentExamIndex={setCurrentExamIndex}
        routineData={routineData}
      />

      {/* Message for mobile view */}
      <div className="block md:hidden text-center text-sm text-gray-500 my-2">
        Swipe right for upcoming exams
      </div>

      {/* Display RoutineCard on mobile and ExamRoutineTable on larger screens */}
      <div className="block md:hidden">
        <RoutineCard
          routineData={routineData}
          currentExamIndex={currentExamIndex}
          theme={theme}
        />
      </div>
      <div className="hidden md:block">
        <ExamRoutineTable routineData={routineData} theme={theme} />
      </div>

      {/* Download Button */}
      <a
        href="https://drive.google.com/uc?id=1ZBT-l-MojgbT4kTijORmXaN1t0EzmlDn"
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
