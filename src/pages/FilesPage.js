import { useState } from "react";
import { UseSelector, useSelector } from "react-redux";

function FilesPage() {
  const [files, setFiles] = useState();
  const token = useSelector((state) => state.counter.accessToken);

  // should try to do this functionality without using state

  async function uploadFile(token) {
    console.log("Form to add files has been submitted");
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      formData.append(files.item(key).name, files.item(key));
    });

    console.log("FormData: ", formData);

    const response = await fetch("http://localhost:3001/add-file", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log("response: ", data.message);
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadFile(token);
        }}
      >
        <div className="container flex justify-center items-center flex-col mx-auto">
          <h1 className="text-white">Files Upload</h1>
          <input
            type="file"
            className="text-white"
            name="myFiles"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            multiple
          />
          <button type="submit" className="p-2 bg-red-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilesPage;
