import React, { useEffect, useRef, useState } from "react";
import { useEditTodo } from "../context/EditTodoProvider";
import { useDispatch } from "react-redux";
import { editTodos } from "../features/todo/todoSlice";

function EditTodo() {
  const { setOpenEdit, currentTodo } = useEditTodo();
  const dispatch = useDispatch();
  const [todoEditTitle, setTodoEditTitle] = useState("");
  const optionRef = useRef();

  useEffect(() => {
    const titleInput = document.querySelector(".form-control");
    titleInput.focus();
    function handleEditClose(event) {
      if (optionRef.current.contains(event.target)) {
        return null;
      } else {
        setOpenEdit(false);
      }
    }
    document.addEventListener("mousedown", handleEditClose);
  }, [optionRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodos({ id: currentTodo.id, todoTitle: todoEditTitle }));
    setOpenEdit(false);
  };

  return (
    <form
      className="form-inline mt-3 mb-4 "
      onSubmit={handleSubmit}
      ref={optionRef}
    >
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        autoComplete="off"
        id="name"
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={todoEditTitle}
        onChange={(e) => setTodoEditTitle(e.target.value)}
      />

      <button type="submit" className="btn btn-primary mt-1">
        submit
      </button>
    </form>
  );
}

export default EditTodo;
