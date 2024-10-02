// src/App.jsx
import React from "react";
import RoutineTableV2 from "./Mainv2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* <RoutineTable /> */}
      <RoutineTableV2 />
    </div>
  );
};

export default App;
