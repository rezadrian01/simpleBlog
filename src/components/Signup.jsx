import { useState } from "react";
import { signup } from "../http";

export default function Signup({ onLoginClick, afterSubmit }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
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
  function handleChangeConfirmPassword(event) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        confirmPassword: event.target.value,
      };
    });
  }
  function handleChangeUsername(event) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        username: event.target.value,
      };
    });
  }
  async function handleSubmit() {
    try {
      const resData = await signup({ ...input });
      console.log(resData);
      afterSubmit();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/4 bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col gap-12">
      <h3 className="text-2xl font-semibold">Sign Up</h3>
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
      <div className="relative">
        <input
          value={input.confirmPassword}
          onChange={handleChangeConfirmPassword}
          className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full peer placeholder-transparent"
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
        />
        <label
          className="absolute peer-placeholder-shown:left-3 peer-placeholder-shown:top-1 pointer-events-none peer-focus:-top-6 peer-focus:left-1 -top-6 left-1 transition-all"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
      </div>
      <div className="relative">
        <input
          value={input.username}
          onChange={handleChangeUsername}
          className="bg-slate-700 focus:outline-none px-3 py-1 rounded w-full peer placeholder-transparent"
          id="username"
          type="text"
          placeholder="Username"
          name="username"
        />
        <label
          className="absolute peer-placeholder-shown:left-3 peer-placeholder-shown:top-1 pointer-events-none peer-focus:-top-6 peer-focus:left-1 -top-6 left-1 transition-all"
          htmlFor="username"
        >
          Username
        </label>
      </div>
      <div className="flex justify-between mr-2">
        <button onClick={onLoginClick} className="text-sm hover:underline">
          Already have account?
        </button>
        <button
          onClick={handleSubmit}
          className="bg-slate-800 px-4 py-2 rounded hover:bg-slate-700"
        >
          Signup
        </button>
      </div>
    </section>
  );
}
