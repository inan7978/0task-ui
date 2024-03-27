import { useState } from "react";

function FilesPage() {
  const [files, setFiles] = useState();

  // should try to do this functionality without using state

  async function uploadFile(e) {
    e.preventDefault();
    console.log("Form to add files has been submitted");
    const formData = new FormData();

    Object.keys(files).forEach((key) => {
      formData.append(files.item(key).name, files.item(key));
    });

    console.log("FormData: ", formData);

    const response = await fetch("http://localhost:3001/add-file", {
      method: "POST",
      header: {
        "content-type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await response.json();
    console.log("response: ", data.message);
  }
  return (
    <div>
      <form onSubmit={uploadFile}>
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
