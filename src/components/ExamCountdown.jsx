import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaClock, FaBook } from "react-icons/fa";

const ExamCountdown = ({
  currentExamIndex,
  setCurrentExamIndex,
  routineData,
}) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  return (
    <motion.div
      className="text-center mb-8 p-6 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl md:text-4xl text-white">
        --- Upcoming Exam --- <br />
        <span className="text-rose-500 ml-2 font-bold">
          {routineData[currentExamIndex].course}
        </span>
      </h2>

      <motion.p
        className="text-lg md:text-xl mt-2 text-white flex justify-center items-center"
        animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
      >
        <FaClock size={30} className="mr-2 text-yellow-300" />
        {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m{" "}
        {timeRemaining.seconds}s
      </motion.p>

      <motion.div
        className="flex justify-center items-center mt-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <FaBook size={30} className="text-green-300 mr-2" />
        <p className="text-white">Prepare Well!</p>
      </motion.div>
    </motion.div>
  );
};

export default ExamCountdown;
