import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  todosData: [],
  todosNotFetched: true,
};

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await axios.get("/api/todos/fetchTodos");
  return await response.data.todos;
});

export const addTodo = createAsyncThunk("addTodo", async (todo: any) => {
  const response = await axios.post("api/todos/createTodo", todo);
  return await response.data.todo;
});
export const deleteTodo = createAsyncThunk("deleteTodo", async (id: any) => {
  const response = await axios.delete("api/todos/deleteTodo", { data: { id } });
  return { id };
});
export const editTodo = createAsyncThunk("editTodo", async (todo: any) => {
  const response = await axios.put("api/todos/editTodo", {
    id: todo._id,
    title: todo.title,
    body: todo.body,
    labels: todo.labels,
    isCompleted: todo.isCompleted,
  });
  const updatedTodo: any = await response.data.todo;

  return { todo: updatedTodo };
});
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    intializeTodos: (state, action) => {
      state = {
        ...state,
        todosData: [],
        todosNotFetched: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return { ...state, todosData: action.payload, todosNotFetched: false };
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const newTodosData = state.todosData?.concat(action.payload);
        return {
          ...state,
          todosNotFetched: true,
          todosData: newTodosData,
        };
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        let newTodosData: any = state.todosData?.filter((todo: any) => {
          return todo._id != action.payload.id;
        });
        return {
          ...state,
          todosNotFetched: true,
          todosData: newTodosData,
        };
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const id = action.payload.todo._id;

        const newTodosData = (state.todosData as any)?.map((todo: any) =>
          todo._id === id ? action.payload : todo
        );

        return {
          ...state,
          todosNotFetched: true,
          todosData: newTodosData,
        };
      });
  },
});

export const { intializeTodos } = todosSlice.actions;
export default todosSlice.reducer;
