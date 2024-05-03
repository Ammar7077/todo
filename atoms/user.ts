import { RecoilState, atom } from "recoil";

const User: RecoilState<false | any> = atom({
  key: "user",
  default: false,
});

export default User;
