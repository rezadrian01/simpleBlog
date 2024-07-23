import { useState } from "react";
import { login } from "../http";

export default function Signin({ afterSubmit, onSignupClick }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  function handleChangeEmail(event) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        email: event.target.value,
      };
    });
  }
  function handleChangePassword(event) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        password: event.target.value,
      };
    });
  }
  async function handleSubmit() {
    try {
      const resData = await login({ ...input });
      //   console.log(resData);
      const { token, userId } = resData;
      localStorage.setItem("token", token);
      afterSubmit();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="w-full sm:w-3/4 md:w-1/2 bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col gap-12">
      <h3 className="text-2xl font-semibold ">Sign In</h3>
      <div className="relative">
        <input
          value={input.email}
          onChange={handleChangeEmail}
          className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full peer placeholder-transparent"
          id="email"
          type="text"
          placeholder="Email"
          name="email"
        />
        <label
          className="absolute peer-placeholder-shown:left-3 peer-placeholder-shown:top-1 pointer-events-none peer-focus:-top-6 peer-focus:left-1 -top-6 left-1 transition-all"
          htmlFor="email"
        >
          Email
        </label>
      </div>
      <div className="relative">
        <input
          value={input.password}
          onChange={handleChangePassword}
          className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full peer placeholder-transparent"
          id="password"
          type="password"
          placeholder="Password"
          name="password"
        />
        <label
          className="absolute peer-placeholder-shown:left-3 peer-placeholder-shown:top-1 pointer-events-none peer-focus:-top-6 peer-focus:left-1 -top-6 left-1 transition-all"
          htmlFor="password"
        >
          Password
        </label>
      </div>
      <div className="flex justify-between mr-2">
        <button onClick={onSignupClick} className="text-sm hover:underline">
          Don't have account yet?
        </button>
        <button
          onClick={handleSubmit}
          className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700"
        >
          Login
        </button>
      </div>
    </section>
  );
}
