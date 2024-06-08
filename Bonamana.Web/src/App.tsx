import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Pages/Todo/Todo";
import AddTodo from "./Pages/AddTTodo/AddTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Todo />} path="/" />
        <Route element={<AddTodo />} path="/todo/add" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
