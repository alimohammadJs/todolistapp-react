import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodos, toggleTodos } from "../features/todo/todoSlice";
import { useEditTodo } from "../context/EditTodoProvider";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const { setOpenEdit, setCurrentTodo } = useEditTodo();

  const handleEdit = () => {
    setOpenEdit(true);
    setCurrentTodo(todo);
  };

  return (
    <li className={`list-group-item`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            type="checkbox"
            className="mr-3"
            onChange={() =>
              dispatch(toggleTodos({ id: todo.id, completed: !todo.completed }))
            }
          ></input>
          <span>{todo.todoTitle}</span>
        </span>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteTodos(todo.id))}
        >
          Delete
        </button>
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
