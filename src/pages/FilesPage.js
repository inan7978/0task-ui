import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  _getFiles,
  _uploadFile,
  _deleteFile,
  _downloadFile,
} from "../api/filesAPI";
import cross from "../img/cross.svg";
import download from "../img/download.svg";
import Cookies from "js-cookie";

function FileBlock({ file, deleteFile, downloadFile, token }) {
  let temp = file.Key;
  let splitTemp = temp.split("/");
  let newName = splitTemp[splitTemp.length - 1];

  const size = file.Size;
  let stringSize = "";
  if (size > 1000000000) {
    stringSize = `${(Math.round((size / 1000000000) * 100) / 100).toFixed(
      2
    )} Gb`;
  } else if (size > 1000000) {
    stringSize = `${(Math.round((size / 1000000) * 100) / 100).toFixed(2)} Mb`;
  } else if (size > 1000) {
    stringSize = `${(Math.round((size / 1000) * 100) / 100).toFixed(2)} Kb`;
  } else {
    stringSize = `${(Math.round(size * 100) / 100).toFixed(2)} Bytes`;
  }

  const btnStyles = "w-1/2 h-20 p-5 cursor-pointer rounded";
  return (
    <div
      className="flex p-3 h-100 my-2 bg-zinc-100 w-11/12 max-w-md gap-2 justify-center rounded"
      key={file.Key}
    >
      <div className="w-3/5 container flex flex-col justify-center break-words">
        <h1 className="text-lg font-bold">{newName}</h1>
        <h1 className="text-sm">{stringSize}</h1>
      </div>
      <div className="w-36 flex gap-1">
        <img
          className={btnStyles + " bg-red-200"}
          src={cross}
          onClick={(e) => {
            e.preventDefault();
            deleteFile(token, file.Key);
          }}
          alt="delete-file-button"
        />
        <img
          className={btnStyles + " bg-blue-200"}
          onClick={(e) => {
            e.preventDefault();
            downloadFile(token, file.Key);
          }}
          src={download}
          alt="download-file-button"
        />
      </div>
    </div>
  );
}

function FilesPage() {
  const [files, setFiles] = useState();
  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const user = "";

  // should try to do this functionality without using state
  // console.log("userId in uploadFile function: ", user);
  // console.log("Token: ", token);

  useEffect(() => {
    getFiles(token);
  }, [loading]);

  async function getFiles(token) {
    const data = await _getFiles(token);
    setList(data.contents);
  }

  async function uploadFile(token, user) {
    if (files) {
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
    } else {
      console.log("No files selected.");
      alert("Please select file(s) to upload.");
    }
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
        return (
          <FileBlock
            file={file}
            downloadFile={downloadFile}
            deleteFile={deleteFile}
            token={token}
          />
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
        <div className="container flex px-2 justify-center items-center flex-col mx-auto">
          <h1 className="text-white my-5 font-medium">
            Upload and view your files here 👇
          </h1>
          <input
            type="file"
            className="block w-full max-w-[500px] text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            name="myFiles"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            multiple
          />
          <button
            type="submit"
            className="p-2 my-5 bg-green-500 text-white rounded w-36 font-bold"
          >
            Upload
          </button>
        </div>
      </form>
      <div className="container mx-auto flex flex-col items-center my-5">
        {loading && <h1 className="text-white font-bold">Uploading...⏳</h1>}
        {mappedFiles}
      </div>
    </div>
  );
}

export default FilesPage;
