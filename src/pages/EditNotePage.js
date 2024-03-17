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
    // console.log(updated);

    const updateNote = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/edit-note",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          noteId: _id,
          newValue: updated,
        }),
      }
    );

    const data = await updateNote.json();

    if (data.status === -1) {
      alert("Something went wrong");
    } else {
      console.log("Note has been edited");
      navigate("../notes");
    }
  }

  async function deleteNote() {
    const deleteNote = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/delete-note",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ toDelete: _id }),
      }
    );

    const result = await deleteNote.json();

    console.log(result.status);

    navigate("../notes");
  }

  return (
    <div className="container mx-auto flex flex-col justify-center items-center my-10">
      <button
        className="mb-5 bg-red-400 text-red-900 rounded p-2"
        onClick={() => {
          deleteNote();
        }}
      >
        Delete Note
      </button>
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
