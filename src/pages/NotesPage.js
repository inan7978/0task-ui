import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function NotesPage() {
  const [notes, setNotes] = useState([""]);
  const token = useSelector((state) => state.counter.accessToken);
  useEffect(() => {
    getNotes(token);
  }, []);
  async function getNotes(token) {
    const notes = await fetch("http://localhost:3001/get-notes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await notes.json();
    console.log("Notes: ", JSON.stringify(data.notes));
    setNotes(data.notes);
  }

  async function newNote(token) {
    const addNote = await fetch("http://localhost:3001/new-note", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ description: "" }),
    });

    const data = await addNote.json();

    if (data.status === -1) {
      console.log("A server error has occured. The new note was not created.");
      getNotes(token);
    } else {
      getNotes(token);
      console.log(data);
    }
  }

  const mappedNotes = notes
    ? notes.map((note) => {
        return <Note note={note} key={note._id} />;
      })
    : null;

  return (
    <div>
      <div className="container mx-auto flex flex-col justify-center items-center max-w-screen-xl">
        {/* <h1 className="text-white text-3xl font-bold my-10">{`${notes.length} notes`}</h1> */}
        <div className="flex gap-5 my-10">
          <input placeholder="Search notes..." />
          <button
            onClick={() => {
              newNote(token);
            }}
            className="p-2 text-white bg-green-500"
          >
            New Note
          </button>
        </div>
        <div className="flex-col flex flex-wrap justify-center gap-5 sm:flex-row">
          {notes.length >= 1 ? mappedNotes : null}
        </div>
      </div>
    </div>
  );
}

function Note({ note }) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {editing && <EditNote note={note} />}
      <div
        onClick={() => {
          console.log(`Note ${note._id} clicked`);
          setEditing(!editing);
        }}
        className="flex flex-col justify-start max-w-[95vw] min-w-36 sm:max-w-[300px] p-5 mb-5 bg-white rounded overflow-hidden"
      >
        <pre style={{ "white-space": "pre-wrap" }}>{note.description}</pre>
      </div>
    </>
  );
}

function EditNote({ note }) {
  const [value, setValue] = useState(note.description);

  return (
    <div className="absolute bg-black opacity-85 flex justify-center">
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

export default NotesPage;
