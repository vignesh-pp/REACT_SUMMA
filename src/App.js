import React, { useState } from "react";
import "./App.css";
import Kanban from "./components/BeautyDrag/KanbanDrag/Kanban";
import Weather from "./components/WeatherApp/Weather";

const App = () => {
  return (
    <div className="App">
      {/* <Kanban /> */}
      <Weather />
    </div>
  );
};

export default App;
