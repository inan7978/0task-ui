import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { _getNotes, _newNote } from "../api/noteAPI";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const token = useSelector((state) => state.counter.accessToken);
  const navigate = useNavigate();

  const btnStyle = "p-3 w-36 mt-5 text-white text-1xl rounded";
  useEffect(() => {
    getNotes(token);
  }, []);

  async function getNotes(token) {
    const result = await _getNotes(token);
    console.log("notes :", result.notes);
    setNotes(result.notes);
  }

  async function newNote(token) {
    console.log("Requested a new note.");
    const data = await _newNote(token);

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

  return token !== "" ? (
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
          {notes.length >= 1 ? mappedNotes.reverse() : null}
        </div>
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
      className="flex flex-col bg-orange-100 justify-start max-w-[95vw] max-h-48 min-w-36 sm:max-w-[600px] p-5 mb-5 bg-white rounded overflow-hidden"
    >
      <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>
        {note.description}
      </pre>
    </div>
  );
}

export default NotesPage;
