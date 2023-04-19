import React, { FC, useEffect, useState } from "react";
import { getTasksApi } from "../api";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { InputField } from "../InputField/InputField";
import { TaskItem } from "../TaskItem/TaskItem";
import { ITask } from "../types";
import "./TaskDesk.css";

export const TaskDesk: FC = () => {
  const [statusField, setStatusField] = useState<"all" | "active" | "complete">(
    "all"
  );
  const [task, setTask] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  // Get backend data
  useEffect(() => {
    getTasksApi()
      .then((res) => {
        setTask(res);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  const renderTaskItem = () => {
    let fileredTasks = [...task];

    if (statusField === "active") {
      fileredTasks = task.filter((task) => task.status === "active");
    } else if (statusField === "complete") {
      fileredTasks = task.filter((task) => task.status === "complete");
    }

    return fileredTasks.map((task) => {
      return (
        <TaskItem
          key={task.id}
          id={task.id}
          status={task.status}
          text={task.text}
          setTask={setTask}
        />
      );
    });
  };

  if (loading) {
    return (
      <main className="task-field">
        <div aria-label="Загрузка" className="loader-wrapper">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
              stroke="currentColor"
              strokeOpacity="0.72"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </main>
    );
  }

  return (
    <main className="task-field">
      <InputField setTask={setTask} />
      <section className="task-field__tasks">
        {task.length === 0 ? (
          <article className="task-field__no-tasks-wrapper">
            <p className="task-field__no-tasks">Нет задач</p>
          </article>
        ) : (
          renderTaskItem()
        )}
      </section>
      <DeskFooter
        allTasks={task.length}
        statusField={statusField}
        setStatusField={setStatusField}
      />
    </main>
  );
};
