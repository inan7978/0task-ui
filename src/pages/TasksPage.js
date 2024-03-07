import { useState, useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  // const [trigger, setTrigger] = useState(["trigger"]);
  const token = useSelector((state) => state.counter.accessToken);

  async function createTask() {
    const response = await fetch("http://localhost:3001/new-task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: document.getElementById("new-task").value,
      }),
    });

    const data = await response.json();

    if (data.status === -1) {
      console("A server error has occured. The new task was not added.");
    } else {
      getTasks(token);
      console.log(data);
    }
  }

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

  useEffect(() => {
    getTasks(token);
  }, []);

  const mappedTasks = tasks
    ? tasks.map((task) => {
        return <Task key={task._id} task={task} />;
      })
    : null;

  return (
    <div className="container mx-auto sm:w-4/5 md:w-1/2 lg:max-w-[1000px]">
      <h1 className="text-white text-center text-3xl my-20">
        Tasks Remaining:{" "}
        {tasks ? tasks.filter((task) => task.completed === false).length : 0}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTask(document.getElementById("new-task").value);
        }}
      >
        <div className="container flex mb-20 gap-5 w-full justify-center">
          <input className="w-full" id="new-task" />
          <button
            className="text-white bg-green-500 w-24 font-bold xl-text"
            type="submit"
          >
            +
          </button>
        </div>
      </form>
      {mappedTasks}
    </div>
  );
}

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

export default TasksPage;
