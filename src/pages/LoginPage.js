import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccess, setFields } from "../redux-stuff/counterSlice";

export default function LoginPage() {
  const user = useSelector((state) => state.counter._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login(email, password) {
    const getTokens = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }
    );

    const data = await getTokens.json();
    dispatch(
      setAccess({ valueName: "accessToken", data: `${data.accessToken}` })
    );
    dispatch(
      setAccess({ valueName: "refreshToken", data: `${data.refreshToken}` })
    );

    getData(data.accessToken);
    navigate("../tasks");
  }

  async function getData(token) {
    const getData = await fetch(
      "https://jwt-auth-webdev-simplified.onrender.com/user-records",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await getData.json();
    // console.log(data[0].tasks);

    if (getData.ok) {
      dispatch(setFields({ valueName: "fname", data: `${data[0].fname}` }));
      dispatch(setFields({ valueName: "lname", data: `${data[0].lname}` }));
      dispatch(setFields({ valueName: "email", data: `${data[0].email}` }));
      dispatch(setFields({ valueName: "_id", data: `${data[0]._id}` }));
      dispatch(
        setFields({
          valueName: "tasks",
          data: data[0].tasks,
        })
      );

      navigate("../tasks");
    } else {
      alert("An error occured!");
    }
  }

  return (
    <div className="bg-gray-900">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              login(
                document.getElementById("email").value,
                document.getElementById("password").value
              );
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
            >
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}
