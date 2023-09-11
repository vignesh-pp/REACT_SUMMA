import React, { useState } from "react";
import "./App.css";
import Kanban from "./components/BeautyDrag/KanbanDrag/Kanban";
import Weather from "./components/WeatherApp/Weather";
import ReduxConcept from "./components/ReduxConcept/ReduxConcept";

const App = () => {
  return (
    <div className="App">
      {/* <Kanban /> */}
      {/* <Weather /> */}
      <ReduxConcept />
    </div>
  );
};

export default App;
