import { useSelector, useDispatch } from "react-redux";
import { setAccess } from "../redux-stuff/counterSlice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { _loadInfo, _updateUser } from "../api/userAPI";

function UserInfo() {
  const accessToken = useSelector((state) => state.counter.accessToken);
  const refreshToken = useSelector((state) => state.counter.refreshToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");

  const inputStyles = "p-3 my-2 w-4/5 rounded font-bold max-w-sm";
  const btnStyle = "p-3 w-36 mt-5 text-white text-1xl rounded";

  async function saveChanges(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fname = form.get("fname");
    const lname = form.get("lname");
    const newPass = form.get("newPass");
    const conPass = form.get("conPass");

    const newInfo = {};

    if (newPass === conPass) {
      for (const [key, value] of form.entries()) {
        newInfo[key] = value;
      }
    } else {
      alert("Passwords do not match.");
    }

    console.log(newInfo);

    const data = await _updateUser(accessToken, newInfo);

    if (data.status === "ok") {
      alert("Changes have been saved.");
    } else if (data.status === -1) {
      alert("An error has occured.");
    }
  }

  useEffect(() => {
    loadInfo(accessToken);
  }, []);

  async function loadInfo() {
    const data = await _loadInfo(accessToken);

    setfname(data[0].fname);
    setlname(data[0].lname);
    setEmail(data[0].email);
  }

  return accessToken !== "" ? (
    <form onSubmit={saveChanges}>
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-white text-2xl mb-5 font-bold underline">{`${fname}'s account`}</h1>
        <input
          type="text"
          className={inputStyles}
          defaultValue={fname}
          name="fname"
        />
        <input
          type="text"
          className={inputStyles}
          defaultValue={lname}
          name="lname"
        />
        <input
          type="email"
          className={inputStyles}
          placeholder={email}
          disabled
          name="email"
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="New password..."
          name="newPass"
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Confirm password..."
          name="conPass"
        />
        <div className="container flex justify-center gap-5">
          <button
            onClick={() => {
              console.log("clicked discard");
              navigate("../tasks");
            }}
            className={btnStyle + " bg-gray-500"}
          >
            Back
          </button>
          {/* <button
            onClick={() => {
              saveChanges();
            }}
            className={btnStyle + " bg-green-500"}
          >
            Save
          </button> */}
          <button className={btnStyle + " bg-green-500"} type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
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
  );
}

export default UserInfo;
