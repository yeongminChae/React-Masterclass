import { atom, selector } from "recoil";
import ToDo from "./components/ToDo";

export interface IToDo {
  text: string;
  category: "TODO" | "DOING" | "DONE";
  id: number;
}

export const categoryState = atom({
  key: "category",
  default: "TODO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // if (category == "TODO")
    //   return toDos.filter((toDo) => toDo.category == "TODO");
    // if (category == "DOING")
    //   return toDos.filter((toDo) => toDo.category == "DOING");
    // if (category == "DONE")
    //   return toDos.filter((toDo) => toDo.category == "DONE");
    return toDos.filter((toDo) => toDo.category == category);
  },
});
