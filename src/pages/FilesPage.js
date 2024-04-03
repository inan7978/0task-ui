import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  _getFiles,
  _uploadFile,
  _deleteFile,
  _downloadFile,
} from "../api/filesAPI";
import cross from "../img/cross.svg";

function FilesPage() {
  const [files, setFiles] = useState();
  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.counter.accessToken);
  const user = useSelector((state) => state.counter._id);

  // should try to do this functionality without using state
  console.log("userId in uploadFile function: ", user);
  console.log("Token: ", token);

  useEffect(() => {
    getFiles(token, user);
  }, [loading]);

  async function getFiles(token, user) {
    const data = await _getFiles(token, user);
    setList(data.contents);
  }

  async function uploadFile(token, user) {
    setLoading(true);
    // console.log("files to add to formData: ", files);
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      formData.append(files.item(key).name, files.item(key));
    });
    formData.append("user", user);
    console.log(...formData);

    const data = await _uploadFile(token, formData);

    console.log(data.message);
    setLoading(false);
  }

  async function deleteFile(token, key) {
    setLoading(true);
    const data = await _deleteFile(token, key);
    console.log("Items deleted: ", data.Deleted);
    setLoading(false);
  }

  async function downloadFile(token, key) {
    const data = await _downloadFile(token, key);
    console.log("Temp URL: ", data);

    function download(url) {
      // a bit hacky but it works lol
      const a = document.createElement("a");
      a.href = url;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    download(data);
  }

  const mappedFiles = list
    ? list.map((file) => {
        let temp = file.Key;
        let splitTemp = temp.split("/");
        let newName = splitTemp[splitTemp.length - 1];

        return (
          <div
            className="flex p-5 my-2 bg-orange-200 w-11/12 max-w-md gap-2 justify-center rounded"
            key={file.Key}
          >
            <div className="w-4/5 overflow-hidden">
              <h1 className="font-medium">{newName}</h1>
              <p>{file.Key}</p>
            </div>
            <div className="w-1/5">
              <a
                className="text-blue-500 underline"
                // href={`https://0task-bucket.s3.amazonaws.com/${file.Key}`}
                onClick={(e) => {
                  e.preventDefault();
                  downloadFile(token, file.Key);
                }}
              >
                Download
              </a>
              <img
                src={cross}
                onClick={(e) => {
                  e.preventDefault();
                  deleteFile(token, file.Key);
                }}
                alt="delete-file-button"
              />{" "}
            </div>
          </div>
        );
      })
    : null;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadFile(token, user);
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
      <div className="container mx-auto flex flex-col items-center my-5">
        {loading && <h1>Uploading...</h1>}
        {mappedFiles}
      </div>
    </div>
  );
}

export default FilesPage;
