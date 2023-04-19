import React, { FC } from "react";
import { putTasksApi } from "../api";
import { ITask } from "../types";
import "./InputField.css";

interface InputFieldProps {
  setTask: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const InputField: FC<InputFieldProps> = ({ setTask }) => {
  const [inputText, setInputText] = React.useState("");

  const Submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Put task to backend
    putTasksApi({ status: "active", text: inputText }).then((id) => {
      setTask((prevState) => {
        const newTask: ITask = {
          status: "active",
          text: inputText,
          id: id,
        };

        return [...prevState, newTask];
      });

      setInputText("");
    });
  };

  return (
    <form className="input" onSubmit={Submit}>
      <button
        className="input__submit-button"
        title="Создать"
        disabled={!inputText}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10"
          className="input__submit-icon"
        >
          <polygon points="0,0 10,5 0,10" fill="none" stroke="black" />
        </svg>
      </button>
      <input
        type="text"
        name="task"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        className="input__input-field"
        placeholder="Новая задача"
      />
    </form>
  );
};
