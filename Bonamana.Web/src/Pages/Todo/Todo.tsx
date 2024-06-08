import { useAppSelector, useAppDispatch, useFetch } from "../../hooks";
import { incre, decre } from "../../features/counterSlice";
import { useNavigate } from "react-router-dom";
import type { TodoItem } from "../../features/todoSlice";
const Todo = () => {
  const { data, loading, error } = useFetch(
    "https://localhost:7129/test",
    "GET"
  );
  const move = useNavigate();
  const counter = useAppSelector((x) => x.counter);
  const dispatch = useAppDispatch();
  const navigatePage = () => {
    move("/todo/add");
  };
  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {data && (data as TodoItem[]).map((x: TodoItem) => <p>{x.id}</p>)}
      <p>Count {counter.value}</p>
      <button type="button" onClick={() => dispatch(incre())}>
        Increment number
      </button>
      <button type="button" onClick={() => dispatch(decre())}>
        Decrement number
      </button>
      <button type="button" onClick={navigatePage}>
        Add todo
      </button>
    </>
  );
};

export default Todo;
