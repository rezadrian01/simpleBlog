import { useContext } from "react";

import { UserContext } from "../store/User-Context";
import { MenuContext } from "../store/Menu-Context";

export default function Nav() {
  //menu
  const {
    handleSigninMenu,
    handleResetMenu,
    handleAddPostMenu,
    handleMyPostMenu,
  } = useContext(MenuContext);

  //user
  const { userContextState, signoutFn } = useContext(UserContext);
  const { isLoggedIn } = userContextState;

  return (
    <nav className="bg-slate-700 px-4 py-6 rounded mb-24">
      <ul className="flex justify-between">
        <li>
          <button onClick={handleResetMenu}>Blog Now</button>
        </li>
        <li className="flex gap-8">
          <button
            onClick={() => handleAddPostMenu(userContextState.isLoggedIn)}
          >
            Create Post
          </button>
          <button onClick={() => handleMyPostMenu(userContextState.isLoggedIn)}>
            My Posts
          </button>
        </li>
        <li className="flex gap-4">
          {!isLoggedIn && <button onClick={handleSigninMenu}>Sign In</button>}
          {isLoggedIn && <button onClick={signoutFn}>Logout</button>}
        </li>
      </ul>
    </nav>
  );
}
