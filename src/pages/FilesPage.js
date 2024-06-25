import { useEffect, useState } from "react";
import {
  _getFiles,
  _uploadFile,
  _deleteFile,
  _downloadFile,
} from "../api/filesAPI";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <li
        key={file.Key}
        onClick={() => {
          downloadFile(token, file.Key);
        }}
        className="col-span-1 flex rounded-md shadow-sm cursor-pointer"
      >
        <div className="flex flex-1 items-center justify-between truncate rounded-md border-b border-r border-t border-gray-200 bg-white">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            <h1 className="font-medium text-gray-900">{newName}</h1>
            <p className="text-gray-500">{stringSize}</p>
          </div>
          <div className="flex-shrink-0 pr-2">
            <button
              type="button"
              class="bg-red-400 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteFile(token, file.Key);
              }}
            >
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </li>
    </div>
  );
}

function FilesPage() {
  const [files, setFiles] = useState();
  const [list, setList] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("user-0task");
  const navigate = useNavigate();
  const btnStyle = "p-3 w-36 mt-5 text-white text-1xl rounded";

  // should try to do this functionality without using state

  useEffect(() => {
    getFiles(token);
  }, [loading]);

  async function getFiles(token) {
    const data = await _getFiles(token);
    setList(data.contents);
    console.log(data.contents);
  }

  async function uploadFile(token) {
    if (files) {
      setLoading(true);
      // console.log("files to add to formData: ", files);
      const formData = new FormData();
      Object.keys(files).forEach((key) => {
        formData.append(files.item(key).name, files.item(key));
      });
      console.log(...formData);

      const data = await _uploadFile(token, formData);

      console.log(`Result of upload: ${data.status}. ${data.data}`);

      setMessage(data.data);

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
    // console.log("Temp URL: ", data.data);

    function download(url) {
      // a bit hacky but it works lol
      const a = document.createElement("a");
      a.href = url;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    download(data.data);
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
          uploadFile(token);
        }}
      >
        {token !== undefined ? (
          <div className="container flex px-2 justify-center items-center flex-col mx-auto">
            <h1 className="text-white my-5 font-medium">
              10 MB max files size
            </h1>
            <h1 className="text-white my-5 font-medium">{message}</h1>
            <input
              type="file"
              className="block w-full max-w-[250px] text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
        ) : (
          <div className="container mx-auto flex flex-col items-center">
            <h1 className="text-white text-2xl my-5 font-bold">
              You need to sign in!
            </h1>
            <button
              className={btnStyle + " bg-green-500"}
              onClick={() => {
                navigate("../login");
              }}
            >
              Log in here
            </button>
          </div>
        )}
      </form>
      <div className="container mx-auto flex flex-col items-center my-5">
        <h1 className="text-white font-bold">
          {loading ? "Loading...⏳" : "Your files 👇"}
        </h1>
        <div
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 p-2 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
        >
          {mappedFiles}
        </div>
      </div>
    </div>
  );
}

export default FilesPage;
