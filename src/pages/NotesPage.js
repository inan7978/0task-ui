import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function NotesPage() {
  const [notes, setNotes] = useState([""]);
  const [newNote, setNewNote] = useState(false);
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

  const mappedNotes = notes
    ? notes.map((note) => {
        return <Note note={note} key={note._id} />;
      })
    : null;

  return (
    <div className="container mx-auto flex flex-col justify-center items-center max-w-screen-xl">
      {/* <h1 className="text-white text-3xl font-bold my-10">{`${notes.length} notes`}</h1> */}
      <div className="flex gap-5 my-10">
        <input placeholder="Search notes..." />
        <button className="p-2 text-white bg-green-500">New Note</button>
      </div>
      <div className="flex-col flex flex-wrap justify-center gap-5 sm:flex-row">
        {notes.length >= 1 ? mappedNotes : null}
      </div>
    </div>
  );
}

function Note({ note }) {
  return (
    <div className="flex flex-col justify-start max-w-[95vw] sm:max-w-[300px] p-5 mb-5 bg-white rounded overflow-hidden">
      <pre style={{ "white-space": "pre-wrap" }}>{note.description}</pre>
    </div>
  );
}

export default NotesPage;
