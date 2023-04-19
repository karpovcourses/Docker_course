import classNames from "classnames";
import React, { FC } from "react";
import { updateTasksApi, deleteTaskApi } from "../api";
import { ITask } from "../types";
import "./TaskItem.css";

interface TaskItemProps {
  id: string;
  text: string;
  status: "active" | "complete";
  setTask: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const TaskItem: FC<TaskItemProps> = ({ id, text, status, setTask }) => {
  const changeTaskStatus = () => {
    if (status === "active") {
      // fetch to beckend
      updateTasksApi({ id: id, text: text, status: "complete" }).then(() => {
        setTask((prevState) => {
          const newState = [...prevState];
          newState.forEach((task) => {
            if (task.id === id) {
              task.status = "complete";
            }
          });

          return newState;
        });
      });
    } else {
      // fetch to beckend
      updateTasksApi({ id: id, text: text, status: "active" }).then(() => {
        setTask((prevState) => {
          const newState = [...prevState];
          newState.forEach((task) => {
            if (task.id === id) {
              task.status = "active";
            }
          });

          return newState;
        });
      });
    }
  };

  const deleteTask = () => {
    deleteTaskApi({ id: id, text: text, status: status }).then(() => {
      setTask((prevState) => prevState.filter((task) => task.id !== id));
    });
  };

  return (
    <article className="task">
      <button
        className={classNames("task__icon", {
          "task__icon--complete": status === "complete",
        })}
        onClick={changeTaskStatus}
      />
      <p
        className={classNames("task__text", {
          "task__text--complete": status === "complete",
        })}
      >
        {text}
      </p>
      <button className="task__delete-button" onClick={deleteTask}>
        X
      </button>
    </article>
  );
};
