import { RecoilState, atom } from "recoil";

const Tasks: RecoilState<false | any> = atom({
  key: "tasks",
  default: [],
});

export default Tasks;
