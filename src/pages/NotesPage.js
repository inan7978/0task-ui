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

  const mappedNotes = notes
    ? notes.map((note) => {
        return <Note note={note} key={note._id} />;
      })
    : null;

  return (
    <div className="container mx-auto flex flex-col justify-center items-center max-w-screen-xl">
      <h1 className="text-white text-3xl font-bold my-10">{`${notes.length} notes`}</h1>
      <div className="flex-col flex flex-wrap justify-center gap-5 sm:flex-row">
        {mappedNotes}
      </div>
    </div>
  );
}

function Note({ note }) {
  return (
    <div className="flex flex-col justify-start max-h-72 p-5 mb-5 bg-white rounded overflow-hidden">
      <pre>{note.description}</pre>
    </div>
  );
}

export default NotesPage;
