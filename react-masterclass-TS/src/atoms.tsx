import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDostate = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO": ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
    "Do Later": ["x", "z"],
  },
});
