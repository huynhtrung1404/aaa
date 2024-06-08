import { useAppDispatch, useCallbackFetch } from "../../hooks";
import { useState } from "react";
import { addTodoItem } from "../../features/todoSlice";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const { call } = useCallbackFetch();
  const navigate = useNavigate();
  const handleSubmitted = async () => {
    const { result } = await call(
      "https://localhost:7129/test/posttodo",
      "POST",
      {
        name,
        isCompleted,
        id: 0,
      }
    );
    if (result) {
      dispatch(
        addTodoItem({
          name,
          isCompleted,
          id: 0,
        })
      );
      navigate("/");
    }
  };

  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      <label htmlFor="isCompleted">Is Completed</label>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => setIsCompleted(e.target.checked)}
      />
      <br />
      <button type="button" onClick={handleSubmitted} disabled={!name}>
        Add
      </button>
    </>
  );
};

export default AddTodo;
