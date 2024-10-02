import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; // New icons for time, date, and room
import { TbPhotoQuestion } from "react-icons/tb";

const ExamRoutineCarousel = ({ routineData, theme }) => {
  const [upcomingExams, setUpcomingExams] = useState([]);

  useEffect(() => {
    const now = new Date();
    const futureExams = routineData
      .filter((exam) => exam.examDate > now)
      .sort((a, b) => a.examDate - b.examDate);

    setUpcomingExams(futureExams);
  }, [routineData]);

  const getRoomColor = (capacity, highestCapacity, lowestCapacity) => {
    if (capacity === highestCapacity) {
      return "bg-green-500";
    } else if (capacity === lowestCapacity) {
      return "bg-red-500";
    } else {
      return "bg-blue-500";
    }
  };

  const handlePreviousQuestionsClick = (link) => {
    window.open(link, "_blank");
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (upcomingExams.length === 0) {
    return <div>Pera Sesh</div>;
  }

  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Slider {...sliderSettings}>
        {upcomingExams.map((exam, index) => {
          const capacities = exam.rooms.map((room) => room.capacity);
          const highestCapacity = Math.max(...capacities);
          const lowestCapacity = Math.min(...capacities);

          return (
            <div key={index} className="p-4 border-2 rounded-md">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`shadow-lg rounded-lg p-6 ${
                  theme === "dark" ? "bg-gray-700" : "bg-white"
                } transition-all duration-500`}
              >
                <h2
                  className={`text-xl font-bold flex items-center gap-2 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {exam.course}
                </h2>

                {/* Date */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 mt-4 text-lg"
                >
                  <FaCalendarAlt className="text-yellow-500" />
                  <span
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {exam.date}
                  </span>
                </motion.div>

                {/* Time */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 mt-2 text-lg"
                >
                  <FaClock className="text-blue-500" />
                  <span
                    className={`${
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {exam.time}
                  </span>
                </motion.div>

                {/* Room Information */}
                <div className="my-4 text-center border-2 p-2 rounded-md">
                  <h3 className="text-xs font-semibold flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    Room Information
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exam.rooms.map((room, roomIndex) => (
                      <div key={roomIndex} className="flex gap-2 items-center">
                        {/* Room Number Bubble */}
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`p-1 text-xs rounded-md text-white ${getRoomColor(
                            room.capacity,
                            highestCapacity,
                            lowestCapacity
                          )}`}
                        >
                          Room: {room.number}
                        </motion.div>

                        {/* Capacity Bubble */}
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`p-1 text-xs rounded-md text-white ${getRoomColor(
                            room.capacity,
                            highestCapacity,
                            lowestCapacity
                          )}`}
                        >
                          Capacity: {room.capacity}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Previous Questions Button */}

                <button
                  className="btn btn-neutral btn-auto w-full "
                  onClick={() =>
                    handlePreviousQuestionsClick(exam.previousQuestionsLink)
                  }
                >
                  <TbPhotoQuestion />
                  Previous Questions
                </button>
              </motion.div>
            </div>
          );
        })}
      </Slider>
    </motion.div>
  );
};

export default ExamRoutineCarousel;
