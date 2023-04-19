import classNames from "classnames";
import React, { FC } from "react";
import "./DeskFooter.css";

interface DeskFooterProps {
  statusField: "all" | "active" | "complete";
  setStatusField: React.Dispatch<
    React.SetStateAction<"all" | "active" | "complete">
  >;
  allTasks: number;
}

export const DeskFooter: FC<DeskFooterProps> = ({
  statusField,
  setStatusField,
  allTasks,
}) => {
  return (
    <section className="desk-footer">
      <span className="desk-footer__task-count">Всего задач: {allTasks}</span>
      <button
        className={classNames(
          "desk-footer__button",
          "desk-footer__button-all",
          { "desk-footer__button--active": statusField === "all" }
        )}
        disabled={statusField === "all"}
        onClick={() => setStatusField("all")}
      >
        Все
      </button>
      <button
        className={classNames(
          "desk-footer__button",
          "desk-footer__button-active",
          { "desk-footer__button--active": statusField === "active" }
        )}
        disabled={statusField === "active"}
        onClick={() => setStatusField("active")}
      >
        Активные
      </button>
      <button
        className={classNames(
          "desk-footer__button",
          "desk-footer__button-complete",
          { "desk-footer__button--active": statusField === "complete" }
        )}
        disabled={statusField === "complete"}
        onClick={() => setStatusField("complete")}
      >
        Выполненные
      </button>
    </section>
  );
};
