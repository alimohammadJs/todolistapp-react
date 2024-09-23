import React from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoFrom";
import "bootstrap/dist/css/bootstrap.min.css";
// import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import store from "./features/store";
import TodoList from "./components/TodoList";

import { EditTodoProvider, useEditTodo } from "./context/EditTodoProvider";
import Modal from "./components/Modal";

function App() {
  return (
    <EditTodoProvider>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </EditTodoProvider>
  );
}

export default App;

function AppContainer() {
  const { openEdit } = useEditTodo();
  return (
    <>
      {openEdit ? <Modal /> : ""}
      <div>
        <div className="container pt-3">
          <h1 className="text-center">TodoApp with RTK</h1>
          <AddTodoForm />
          <TodoList />
        </div>
      </div>
    </>
  );
}
