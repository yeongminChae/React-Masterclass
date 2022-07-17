import { atom, selector } from "recoil";
import ToDo from "./components/ToDo";

export interface IToDo {
  text: string;
  category: "TODO" | "DOING" | "DONE";
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category == "TODO"),
      toDos.filter((toDo) => toDo.category == "DOING"),
      toDos.filter((toDo) => toDo.category == "DONE"),
    ];
  },
});
