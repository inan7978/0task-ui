import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import garbage from "../img/garbage.svg";
import garbageWhite from "../img/garbageWhite.svg";
import {
  _createTask,
  _deleteTask,
  _completeTask,
  _uncompleteTask,
  _getTasks,
  _editTask,
} from "../api/taskAPI";

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
    const data = await _completeTask(toComplete, token);

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
    const data = await _uncompleteTask(toUncomplete, token);

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

  async function editTask(toEdit, newVal) {
    console.log("Editting task: ", toEdit);
    const data = await _editTask(toEdit, newVal, token);

    if (data.status === -1) {
      console.log("A server error has occured. The task was not modified.");
      getTasks(token);
    } else {
      getTasks(token);
      console.log(data);
    }
  }

  async function getTasks(token) {
    const data = await _getTasks(token);

    console.log("Tasks", JSON.stringify(data.tasks));
    setTasks(data.tasks);
  }

  useEffect(() => {
    getTasks(token);
  }, []);

  const mappedTasksDone = tasks
    ? tasks.map((task) => {
        return task.completed ? (
          <Task
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            completeTask={completeTask}
            uncompleteTask={uncompleteTask}
            editTask={editTask}
          />
        ) : null;
      })
    : null;
  const mappedTasks = tasks
    ? tasks.map((task) => {
        return task.completed ? null : (
          <Task
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            completeTask={completeTask}
            uncompleteTask={uncompleteTask}
            editTask={editTask}
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
      <div className="px-2 text-center">
        {tasks.length > 0 ? ( // not completed
          mappedTasks.reverse()
        ) : (
          <h1 className="2xl-text font-bold text-white">
            Im sure you can find something to do 😉
          </h1>
        )}
      </div>
      <div className="px-2 text-center">
        {tasks.length > 0 //completed
          ? mappedTasksDone.reverse()
          : null}
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

function Task({ task, deleteTask, uncompleteTask, completeTask, editTask }) {
  const [editing, setEditing] = useState(false);
  const [newVal, setNewVal] = useState("");

  const textAreaStyle =
    "resize-none w-[250px] md:w-[300px] lg:w-[450px] xl:w-[500px] max-w-[500px] border-none h-36";
  return task.completed ? (
    <div className="container mx-auto flex gap-5 justify-between bg-gray-800 rounded my-5 p-2">
      <input
        className="h-7 w-7 bg-gray-500 text-gray-800"
        type="checkbox"
        defaultChecked={task.completed}
        onChange={() => {
          task.completed ? uncompleteTask(task._id) : completeTask(task._id);
        }}
      />
      <div>
        {editing ? (
          <textarea
            onBlur={() => {
              editTask(task._id, newVal);
              setEditing(false);
            }}
            defaultValue={task.description}
            className={textAreaStyle}
            onChange={(e) => {
              setNewVal(e.target.value);
            }}
            autoFocus
          />
        ) : (
          <h1
            onClick={() => {
              setNewVal(task.description);
              setEditing(true);
            }}
            className="text-white text-xl"
          >
            {task.description}
          </h1>
        )}
      </div>

      <img
        onClick={() => {
          deleteTask(task._id);
        }}
        src={garbage}
        className="w-5 h-5 cursor-pointer"
        x
      />
    </div>
  ) : (
    <div className="container mx-auto flex gap-5 justify-between bg-blue-700 rounded my-5 p-2">
      <input
        className="h-7 w-7"
        type="checkbox"
        defaultChecked={task.completed}
        onChange={() => {
          task.completed ? uncompleteTask(task._id) : completeTask(task._id);
        }}
      />
      <div>
        {editing ? (
          <textarea
            onBlur={() => {
              editTask(task._id, newVal);
              setEditing(false);
            }}
            defaultValue={task.description}
            className={textAreaStyle}
            onChange={(e) => {
              setNewVal(e.target.value);
            }}
            autoFocus
          />
        ) : (
          <h1
            onClick={() => {
              setNewVal(task.description);
              setEditing(true);
            }}
            className="text-white text-xl"
          >
            {task.description}
          </h1>
        )}
      </div>
      <img
        onClick={() => {
          deleteTask(task._id);
        }}
        src={garbageWhite}
        className="w-5 h-5 cursor-pointer"
        x
      />
    </div>
  );
}

export default TasksPage;
