import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const hadleValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(hadleValid)}>
        <input
          {...register("toDo", {
            required: "Please write ToDOs",
          })}
          placeholder="Write a To Do"
        />
        <button>Add </button>
      </form>
    </div>
  );
}

export default ToDoList;
