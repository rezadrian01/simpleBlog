import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "../store/ui-slice";
import { authActions } from "../store/auth-slice";

export default function Nav() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.tokenCheck());
  }, [useSelector((state) => state.auth.isLoggedIn)]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  async function signoutHandler() {
    dispatch(authActions.signoutHandler());
    dispatch(uiActions.resetMenu());
  }
  return (
    <nav className="bg-slate-700 px-4 py-6 rounded mb-20">
      <ul className="flex justify-between">
        <li>
          <button onClick={() => dispatch(uiActions.resetMenu())}>
            Blog Zone
          </button>
        </li>
        <li className="flex gap-8">
          <button
            onClick={() => dispatch(uiActions.addPostMenu({ isLoggedIn }))}
          >
            Create Post
          </button>
          <button
            onClick={() => dispatch(uiActions.myPostMenu({ isLoggedIn }))}
          >
            My Posts
          </button>
        </li>
        <li className="flex gap-4">
          {!isLoggedIn && (
            <button onClick={() => dispatch(uiActions.signinMenu())}>
              Sign In
            </button>
          )}
          {isLoggedIn && <button onClick={signoutHandler}>Logout</button>}
        </li>
      </ul>
    </nav>
  );
}
