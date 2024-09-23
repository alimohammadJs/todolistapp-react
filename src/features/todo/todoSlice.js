import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// http://localhost:5000/

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getAsyncTodos = createAsyncThunk(
  "todos/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTodos = createAsyncThunk(
  "todos/post",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTodos = createAsyncThunk(
  "todos/toggle",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${payload.id}`, {
        completed: payload.completed,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteTodos = createAsyncThunk(
  "todos/delete",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/todos/${payload}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTodos = createAsyncThunk(
  "todos/edit",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${payload.id}`, {
        todoTitle: payload.todoTitle,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state) => {
        state.loading = true;
        state.todos = [];
        state.error = "";
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })
      .addCase(createTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodos.rejected, (state, action) => {
        state.loading = false;
        state.todos = [];
        state.error = action.payload;
      })

      .addCase(toggleTodos.fulfilled, (state, action) => {
        state.loading = false;
        const selectedTodo = state.todos.find(
          (todo) => todo.id == action.payload.id
        );
        selectedTodo.completed = action.payload.completed;
      })
      .addCase(deleteTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => {
          return todo.id !== action.payload.id;
        });
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        state.loading = false;
        const editedTodo = state.todos.find((todo) => {
          return todo.id == action.payload.id;
        });
        editedTodo.todoTitle = action.payload.todoTitle;
      });
  },
});

// export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

// reducers: {
//   addTodo: (state, action) => {
//     state.todos.push(action.payload);
//   },
//   toggleTodo: (state, action) => {
//     const selectedTodo = state.todos.find((todo) => {
//       return todo.id === Number(action.payload);
//     });
//     selectedTodo.completed = !selectedTodo.completed;
//   },
//   deleteTodo: (state, action) => {
//     state.todos = state.todos.filter((todo) => {
//       return todo.id !== action.payload;
//     });
//   },
//   editTodo: (state, action) => {
//     const passTodo = state.todos.find((todo) => {
//       return todo.id == action.payload.currentTodo;
//     });
//     passTodo.todoTitle = action.payload.todoEditTitle;

//   },
// },
