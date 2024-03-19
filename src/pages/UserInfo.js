import { useSelector, useDispatch } from "react-redux";
import { setAccess } from "../redux-stuff/counterSlice";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

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

  async function saveChanges() {}

  useEffect(() => {
    loadInfo();
  }, []);

  async function loadInfo() {
    const userInfo = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/user-info",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await userInfo.json();

    setfname(data[0].fname);
    setlname(data[0].lname);
    setEmail(data[0].email);
  }

  return accessToken !== "" ? (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-white text-2xl mb-5 font-bold underline">{`${fname}'s account`}</h1>
      <input type="text" className={inputStyles} placeholder={fname} />
      <input type="text" className={inputStyles} placeholder={lname} />
      <input type="email" className={inputStyles} placeholder={email} />
      <input
        type="text"
        className={inputStyles}
        placeholder="New password..."
      />
      <input
        type="text"
        className={inputStyles}
        placeholder="Confirm password..."
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
