import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  //   const onClick = (newCategory: IToDo["category"]) => {};
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        // <button onClick={() => onClick("DOING")}>Doing</button>
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TODO" && (
        // <button onClick={() => onClick("TODO")}>ToDo</button>
        <button name="TODO" onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== "DONE" && (
        // <button onClick={() => onClick("DONE")}>Done</button>
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
export default ToDo;
