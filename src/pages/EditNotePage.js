import { useLocation } from "react-router-dom";

function EditNotePage() {
  const { state } = useLocation();
  const { _id, description } = state;
  return (
    <div>
      <h1>{_id}</h1>
      <p>{description}</p>
    </div>
  );
}

export default EditNotePage;
