import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoItem {
  readonly id: number;
  name: string;
  isCompleted: boolean;
}

export interface TodoList {
  todoItems: TodoItem[];
}

const initialState: TodoList = {
  todoItems: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoItem: (state, action: PayloadAction<TodoItem>) => {
      state.todoItems = [...state.todoItems, action.payload];
    },
  },
});

export const { addTodoItem } = todoSlice.actions;
export default todoSlice.reducer;
