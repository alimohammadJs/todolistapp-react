import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodos } from "../features/todo/todoSlice";

function AddTodoFrom() {
  const [todoTitle, setTodoTitle] = useState("");
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const titleFocus = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: String(Date.now()),
      todoTitle,
      completed: false,
    };
    dispatch(createTodos(newTodo));
    setTodoTitle("");
  };

  useEffect(() => {
    titleFocus.current.focus();
  }, []);

  return (
    <form
      className={`form-inline mt-3 mb-4  ${
        loading ? "opacity-50" : "opacity-100"
      }`}
      onSubmit={handleSubmit}
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
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        ref={titleFocus}
      />
      <button disabled={loading} type="submit" className="btn btn-primary mt-1">
        {loading ? " submitting..." : "submit"}
      </button>
    </form>
  );
}

export default AddTodoFrom;
