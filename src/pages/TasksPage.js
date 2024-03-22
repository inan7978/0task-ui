import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _createTask, _deleteTask } from "../api/taskAPI";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const token = useSelector((state) => state.counter.accessToken);
  const navigate = useNavigate();

  const btnStyle = "p-3 w-36 mt-5 text-white text-1xl rounded";

  async function createTask() {
    const data = await _createTask(
      token,
      document.getElementById("new-task").value
    );
    if (data.status === -1) {
      console("A server error has occured. The new task was not added.");
      getTasks(token);
    } else {
      document.getElementById("new-task").value = "";
      getTasks(token);
      console.log(data);
    }
  }

  async function deleteTask(toDelete) {
    console.log("Request to delete: ", toDelete);
    const data = await _deleteTask(token, toDelete);

    if (data.status === -1) {
      console("A server error has occured. The new task was not deleted.");
      getTasks(token);
    } else {
      getTasks(token);
      console.log(data);
    }
  }

  async function completeTask(toComplete) {
    console.log("Requesting to mark as completed: ", toComplete);
    const response = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/toggle-done",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          toComplete: toComplete,
        }),
      }
    );

    const data = await response.json();

    if (data.status === -1) {
      console.log(
        "A server error has occured. The new task was not completed."
      );
      getTasks(token);
    } else {
      getTasks(token);
      console.log(data);
    }
  }
  async function uncompleteTask(toUncomplete) {
    console.log("Requesting to mark as uncompleted: ", toUncomplete);
    const response = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/toggle-not-done",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          toUncomplete: toUncomplete,
        }),
      }
    );

    const data = await response.json();

    if (data.status === -1) {
      console.log(
        "A server error has occured. The new task was not marked as needing completion."
      );
      getTasks(token);
    } else {
      getTasks(token);
      console.log(data);
    }
  }

  async function getTasks(token) {
    const tasks = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/get-tasks",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await tasks.json();
    console.log("Tasks", JSON.stringify(data.tasks));
    setTasks(data.tasks);
  }

  useEffect(() => {
    getTasks(token);
  }, []);

  const mappedTasks = tasks
    ? tasks.map((task) => {
        return (
          <Task
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            completeTask={completeTask}
            uncompleteTask={uncompleteTask}
          />
        );
      })
    : null;

  return token !== "" ? (
    <div className="container mx-auto sm:w-4/5 md:w-1/2 lg:max-w-[800px]">
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
        <div className="container flex mb-20 gap-5 w-full justify-center p-2">
          <input className="w-full" id="new-task" placeholder="New task..." />
          <button
            className="text-white bg-green-500 w-24 font-bold xl-text"
            type="submit"
          >
            +
          </button>
        </div>
      </form>
      <div className="p-2 text-center">
        {tasks.length > 0 ? (
          mappedTasks.reverse()
        ) : (
          <h1 className="2xl-text font-bold text-white">
            Im sure you can find something to do 😉
          </h1>
        )}
      </div>
    </div>
  ) : (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-white text-2xl my-5 font-bold">
        You need to sign in!
      </h1>
      <button
        className={btnStyle + " bg-green-500"}
        onClick={() => {
          navigate("../login");
        }}
      >
        Log in here
      </button>
    </div>
  );
}

function Task({ task, deleteTask, uncompleteTask, completeTask }) {
  return (
    <div className="container mx-auto flex gap-5 items-center justify-between bg-red-800 rounded my-5 p-2">
      <input
        className="h-7 w-7"
        type="checkbox"
        defaultChecked={task.completed}
        onChange={() => {
          task.completed ? uncompleteTask(task._id) : completeTask(task._id);
        }}
      />
      <h1 className="text-white text-xl">{task.description}</h1>
      <button
        onClick={() => {
          deleteTask(task._id);
        }}
      >
        X
      </button>
    </div>
  );
}

export default TasksPage;
