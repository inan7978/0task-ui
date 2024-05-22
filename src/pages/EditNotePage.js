import { useLocation, useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import { _saveChanges, _deleteNote } from "../api/noteAPI";
import Cookies from "js-cookie";

function EditNotePage() {
  const { state } = useLocation();
  const { _id, description } = state;
  const navigate = useNavigate();

  const token = Cookies.get("user-0task");
  const btnStyle = "p-3 w-36 mt-5 text-white text-1xl rounded";

  async function saveChanges() {
    const updated = document.getElementById("edit-note").value;
    const data = await _saveChanges(token, updated, _id);
    if (data.status === -1) {
      alert("Something went wrong");
    } else {
      console.log("Note has been edited");
      navigate("../notes");
    }
  }

  async function deleteNote() {
    const result = await _deleteNote(token, _id);
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
