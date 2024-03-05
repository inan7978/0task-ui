import { useState, useEffect } from "react";

function TasksPage() {
  const [remaining, setRemaining] = useState(0);

  function getRemaining(count) {
    setRemaining(count);
  }

  return (
    <div className="App">
      <header className="App-header">
        {remaining > 0 ? (
          <h1>
            {" "}
            ToDo: {remaining}{" "}
            {(remaining > 1 && "Items remain") ||
              (remaining === 1 && "Item left!") ||
              (remaining < 1 && "left. Nice work!")}
          </h1>
        ) : (
          <h1>All done!</h1>
        )}
      </header>
      <List getRemaining={getRemaining} />
    </div>
  );
}

function List({ getRemaining }) {
  const [list, setList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [newTask, setNewTask] = useState("");

  var counter = 0;
  list.filter((item) => {
    return item.completed === false && counter++;
  });

  useEffect(() => {}, []);

  ////////////////////////////////////// This area fetches the Tasks
  useEffect(() => {}, [list.length]);

  /////////////////////////////////// This is the handler for creating a task
  async function handleSubmit(e) {}
  //////////////////////////////////// This is the handler for when you delete a task
  async function handleDelete(val) {}
  //////////////////////////////////// This is the handler for when you check a task off
  async function handleComplete(val) {}

  ////////////////////////////////////////////// This maps the current list
  const mappedItems = list.map((item) => {
    return (
      <li
        key={list.indexOf(item)}
        className={
          item.completed ? "task-container-completed" : "task-container"
        }
      >
        <div className="checkbox-container">
          <input
            className="checkbox"
            type="checkbox"
            defaultChecked={item.completed}
            onChange={(e) => {
              handleComplete(item);
            }}
          />
        </div>
        <div className="text-container">
          <span className="task-text">{item.task}</span>
        </div>
        <div className="del-btn-container">
          <button
            className="del-btn"
            onClick={() => {
              handleDelete(item);
            }}
          >
            X
          </button>
        </div>
      </li>
    );
  });
  ////////////////////////////////////// This is what renders
  return (
    <>
      <form onSubmit={handleSubmit} className="new-task-field">
        <input
          className={"new-task-text"}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={"new-task-button"} type="submit">
          +
        </button>
      </form>
      <div className="all-tasks-container">
        {list.length > 0
          ? mappedItems
          : "Im sure you can find something to do 😉"}
      </div>
    </>
  );
}

export default TasksPage;
