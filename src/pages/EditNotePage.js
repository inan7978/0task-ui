import { useLocation, useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";

function EditNotePage() {
  const { state } = useLocation();
  const { _id, description } = state;
  const navigate = useNavigate();

  const token = useSelector((state) => state.counter.accessToken);
  const btnStyle = "p-3 w-36 mt-5 text-white text-1xl rounded";

  async function saveChanges() {
    const updated = document.getElementById("edit-note").value;
    console.log(updated);

    const updateNote = await fetch("http://localhost:3001/edit-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        noteId: _id,
        newValue: updated,
      }),
    });

    const data = await updateNote.json();

    if (data.status === -1) {
      alert("Something went wrong");
    } else {
      console.log("Note has been edited");
      navigate("../notes");
    }
  }

  return (
    <div className="container mx-auto flex flex-col justify-center items-center my-10">
      <textarea
        className="h-96 w-11/12  max-w-[720px] rounded resize-none"
        defaultValue={description}
        id="edit-note"
      />
      <div className="container flex justify-center gap-5">
        <button
          onClick={() => {
            console.log("clicked discard");
            navigate("../notes");
          }}
          className={btnStyle + " bg-gray-500"}
        >
          Back
        </button>
        <button
          onClick={() => {
            saveChanges();
          }}
          className={btnStyle + " bg-green-500"}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditNotePage;
