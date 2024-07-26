import { useState, useContext, useEffect } from "react";
import { UserContext } from "../store/User-Context";
import { MenuContext } from "../store/Menu-Context";
import Loading from "./Loading";
import Error from "./Error";

export default function Signin() {
  const { signinFn, userContextState } = useContext(UserContext);
  const { handleSignupMenu, handleResetMenu } = useContext(MenuContext);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  function handleInputChange(identifier, value) {
    setInput((prevInput) => ({
      ...prevInput,
      [identifier]: value,
    }));
  }
  async function handleSubmit() {
    const result = await signinFn({ ...input });
    if (!result) {
      setError(true);
      return;
    }
    handleResetMenu();
  }

  return (
    <>
      {userContextState.isLoading && <Loading />}
      {userContextState.hasError && <Error />}
      {!userContextState.isLoading && !userContextState.hasError && (
        <section className="w-5/6 sm:w-3/4 md:w-1/2 lg:w-1/4 h-[70vh] bg-slate-900 p-4 rounded-lg shadow-lg mx-auto flex flex-col justify-between">
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-semibold ">Sign In</h3>
              {error && <p className="text-red-400">Something went wrong!</p>}
            </div>
            <div className="relative">
              <input
                value={input.email}
                onChange={({ target }) =>
                  handleInputChange("email", target.value)
                }
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
                onChange={({ target }) =>
                  handleInputChange("password", target.value)
                }
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
          </div>
          <div className="flex justify-between mr-2 mb-4">
            <button
              onClick={handleSignupMenu}
              className="text-sm hover:underline"
            >
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
      )}
    </>
  );
}
