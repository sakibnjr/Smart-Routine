import React from "react";
import { motion } from "framer-motion";
import { GrChapterPrevious } from "react-icons/gr";

const ExamRoutineTable = ({ routineData, theme }) => {
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

  return (
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
                <td className="p-2 md:p-4 text-sm md:text-base">{item.date}</td>
                <td className="p-2 md:p-4 text-sm md:text-base font-semibold text-blue-400">
                  {item.course}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-base">{item.time}</td>
                <td className="p-2 md:p-4 text-sm md:text-base">
                  {item.rooms.map((room, roomIndex) => (
                    <div
                      key={roomIndex}
                      className={`inline-block p-1 rounded-full ${getRoomColor(
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
                      className={`inline-block p-2 rounded-full ${getRoomColor(
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
  );
};

export default ExamRoutineTable;
