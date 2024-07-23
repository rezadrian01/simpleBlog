import { useState, useEffect } from "react";

import Posts from "./components/Posts";
import Nav from "./components/Nav";
import NewPost from "./components/NewPost";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  const [data, setData] = useState({
    selectedMenu: "posts",
    isLoggedIn: false,
  });
  useEffect(() => {
    tokenCheck();
  }, []);
  function handleAddPost() {
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "newPost",
      };
    });
  }
  function handleSignin() {
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "signin",
      };
    });
  }
  function handleSignup() {
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "signup",
      };
    });
  }
  function handleResetMenu() {
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "posts",
      };
    });
    tokenCheck();
  }
  function handleLogout() {
    localStorage.removeItem("token");
    tokenCheck();
  }
  function tokenCheck() {
    const token = localStorage.getItem("token");
    setData((prevData) => {
      return {
        ...prevData,
        isLoggedIn: token,
      };
    });
  }
  let content = <Posts />;
  if (data.selectedMenu === "newPost") {
    content = (
      <NewPost onCancel={handleResetMenu} afterSubmit={handleResetMenu} />
    );
  } else if (data.selectedMenu === "signin") {
    content = (
      <Signin afterSubmit={handleResetMenu} onSignupClick={handleSignup} />
    );
  } else if (data.selectedMenu === "signup") {
    content = <Signup onLoginClick={handleSignin} afterSubmit={handleSignin} />;
  }
  return (
    <div className="bg-slate-800 text-slate-300 min-h-screen pb-20">
      <header>
        <Nav
          isLoggedIn={data.isLoggedIn}
          onAddPost={handleAddPost}
          onSignin={handleSignin}
          onLogout={handleLogout}
        />
      </header>
      {content}
    </div>
  );
}

export default App;
