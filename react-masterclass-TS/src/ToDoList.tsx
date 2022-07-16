import React, { useState } from "react";

function ToDoList() {
  const [ToDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(ToDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={ToDo} placeholder="Write a To Do" />
        <button>Add </button>
      </form>
    </div>
  );
}

export default ToDoList;
