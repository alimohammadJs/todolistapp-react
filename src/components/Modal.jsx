import React from "react";
import EditTodo from "./EditTodo";

function Modal() {
  return (
    <div
      className="bg-dark p-2 text-dark bg-opacity-50"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        inset: "0",
        zIndex: "10",
      }}
    >
      <EditTodo />
    </div>
  );
}

export default Modal;


