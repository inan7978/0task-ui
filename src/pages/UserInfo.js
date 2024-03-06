import { useSelector, useDispatch } from "react-redux";
import { setAccess } from "../redux-stuff/counterSlice";

function UserInfo() {
  const accessToken = useSelector((state) => state.counter.accessToken);
  const refreshToken = useSelector((state) => state.counter.refreshToken);
  const userID = useSelector((state) => state.counter._id);
  const fname = useSelector((state) => state.counter.fname);
  const lname = useSelector((state) => state.counter.lname);
  const email = useSelector((state) => state.counter.email);
  const tasks = useSelector((state) => state.counter.tasks);
  const dispatch = useDispatch();

  const infoStyles = "text-white";

  console.log("tasks ", tasks);

  // const mappedTasks = tasks;

  const mappedTasks = tasks
    ? tasks.map((task) => {
        return (
          <li key={task.description}>
            <div>
              <h2>{task.description}</h2>
              <h2>Completed: {task.completed ? "true" : "false"}</h2>
            </div>
          </li>
        );
      })
    : null;

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className={infoStyles}>Refresh token: {refreshToken.length}</h1>
      <h1 className={infoStyles}>Access token: {accessToken}</h1>
      <h1 className={infoStyles}>UserID: {userID}</h1>
      <h1 className={infoStyles}>First Name: {fname}</h1>
      <h1 className={infoStyles}>Last Name: {lname}</h1>
      <h1 className={infoStyles}>Email: {email}</h1>
      <ul>{mappedTasks}</ul>
    </div>
  );
}

export default UserInfo;
