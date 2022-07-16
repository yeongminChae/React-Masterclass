import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

// How do we change elements in the List ?
// const food = ["pizza","mango","kimchi","kimbap"]
// i want to replace mango into "감"
// const front = ["pizza"]
// const back = ["kimchi","kimbap"]
// const final = [...front,"감",...back]

// const food = ["pizza","mango","kimchi","kimbap"]
// => ["pizza","mango","kimchi","kimbap"]
// const target = 1
// [...food.slice(0,target), "감" , ...food.slice(target+1)]
// => (4) ['pizza', '감', 'kimchi', 'kimbap']

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TODO" && (
        <button name="TODO" onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
export default ToDo;
