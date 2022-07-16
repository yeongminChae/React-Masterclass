import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

interface IToDo {
  text: string;
  category: "TODO" | "DOING" | "DONE";
  id: number;
}

interface IForm {
  toDo: string;
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  // const valFn = useRecoilValue(toDoState); // get the value from the Atom
  // const modFn = useSetRecoilState(toDoState); // modify the value of the Atom
  const [toDos, setToDos] = useRecoilState(toDoState); // the combine those two codes valFn & modFn
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const hadleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, category: "TODO", id: Date.now() },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>ToDos</h1>
      <hr />
      <form onSubmit={handleSubmit(hadleValid)}>
        <input
          {...register("toDo", {
            required: "Please write ToDOs",
          })}
          placeholder="Write a To Do"
        />
        <button>Add </button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text} </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
