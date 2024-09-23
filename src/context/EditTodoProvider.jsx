import React, { createContext, useContext, useState } from "react";

const editTodoContext = createContext();

export function EditTodoProvider({ children }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  return (
    <editTodoContext.Provider
      value={{ openEdit, setOpenEdit, currentTodo, setCurrentTodo }}
    >
      {children}
    </editTodoContext.Provider>
  );
}

export function useEditTodo() {
  return useContext(editTodoContext);
}
