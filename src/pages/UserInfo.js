import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  timesTwo,
  setZero,
} from "../redux-stuff/counterSlice";

function UserInfo() {
  const userID = useSelector((state) => state.counter._id);
  const fname = useSelector((state) => state.counter.fname);
  const lname = useSelector((state) => state.counter.lname);
  const email = useSelector((state) => state.counter.email);
  const tasks = useSelector((state) => state.counter.tasks);
  const dispatch = useDispatch();

  console.log(userID, fname, lname, email, tasks);

  return <div></div>;
}

export default UserInfo;
