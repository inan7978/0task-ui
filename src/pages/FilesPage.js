import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _getFiles, _uploadFile } from "../api/filesAPI";
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
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      formData.append(files.item(key).name, files.item(key));
    });
    formData.append("user", user);
    const data = await _uploadFile(token, formData);
    console.log(data.message);
    setLoading(false);
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
            </div>
            <div className="w-1/5">
              <a
                className="text-blue-500 underline"
                href={`https://0task-bucket.s3.amazonaws.com/${file.Key}`}
              >
                Download
              </a>
              <img src={cross} alt="My Happy SVG" />{" "}
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
