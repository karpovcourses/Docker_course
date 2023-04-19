import React from "react";
import { TaskDesk } from "./TaskDesk/TaskDesk";
import { Title } from "./Title/Title";

export const App = () => {
  return (
    <div className="container">
      <Title />
      <TaskDesk />
    </div>
  );
};
