import { useState, useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";

function TasksPage() {
  const [tasks, setTasks] = useState([
    { description: "nothing here", completed: "false" },
  ]);
  const token = useSelector((state) => state.counter.accessToken);

  // console.log(temp);
  useEffect(() => {
    async function getTasks(token) {
      const tasks = await fetch("http://localhost:3001/get-tasks", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await tasks.json();
      console.log("data", JSON.stringify(data.tasks));
      setTasks(data.tasks);
    }

    getTasks(token);
  }, []);

  function Task(props) {
    return (
      <div className="container mx-auto flex gap-5 items-center justify-between h-10 bg-red-800 my-5 p-2">
        <h1 className="text-white text-xl">{props.task.description}</h1>
        <input
          className="h-7 w-7"
          type="checkbox"
          defaultChecked={props.task.completed}
        />
      </div>
    );
  }

  const mappedTasks = tasks
    ? tasks.map((task) => {
        return <Task key={task.description} task={task} />;
      })
    : null;

  return (
    <div className="container mx-auto sm:w-4/5 md:w-1/2 lg:max-w-[1000px]">
      <h1 className="text-white text-center text-3xl my-20">
        Tasks Remaining:{" "}
        {tasks ? tasks.filter((task) => task.completed === true).length : 0}
      </h1>
      {mappedTasks}
    </div>
  );
}

export default TasksPage;
