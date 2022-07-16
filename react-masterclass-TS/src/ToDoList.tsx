import React, { useState } from "react";
import { useForm } from "react-hook-form";

// without react-hook-form

// function ToDoList() {
//   const [ToDo, setToDo] = useState("");
//   const [ToDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (ToDo.length < 10) {
//       return setToDoError("ToDo shoudl be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={ToDo} placeholder="Write a To Do" />
//         <button>Add </button>
//         {ToDoError != "" ? ToDoError : ""}
//       </form>
//     </div>
//   );
// }

// with react-hook-form

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register("Email")} placeholder="Email" />
        <input {...register("Firstname")} placeholder="First name" />
        <input {...register("lastname")} placeholder="last name" />
        <input {...register("password")} placeholder="pawssword" />
        <input {...register("password2")} placeholder="password2" />
        <button>Add </button>
      </form>
    </div>
  );
}

export default ToDoList;
