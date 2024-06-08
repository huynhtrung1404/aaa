import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "../features/counterSlice";
import todoSliceReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    todo: todoSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
