import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NotesPage() {
  const [notes, setNotes] = useState([]);
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
    // console.log("Notes: ", JSON.stringify(data.notes));
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
        <div className="flex gap-5 my-10">
          <input placeholder="Search notes..." className="rounded" />
          <button
            onClick={() => {
              newNote(token);
            }}
            className="p-2 text-white bg-green-500 rounded"
          >
            New Note
          </button>
        </div>
        <div className="flex flex-col justify-center gap">
          {notes.length >= 1 ? mappedNotes : null}
        </div>
      </div>
    </div>
  );
}

function Note({ note }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        // console.log(`Note ${note._id} clicked`);

        navigate("../edit-note", {
          state: {
            _id: note._id,
            description: note.description,
          },
        });
      }}
      className="flex flex-col justify-start max-w-[95vw] max-h-48 min-w-36 sm:max-w-[300px] p-5 mb-5 bg-white rounded overflow-hidden"
    >
      <pre style={{ whiteSpace: "pre-wrap" }}>{note.description}</pre>
    </div>
  );
}

export default NotesPage;
