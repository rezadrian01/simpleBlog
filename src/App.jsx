import { useState, useEffect } from "react";

import Posts from "./components/Posts";
import Nav from "./components/Nav";
import NewPost from "./components/NewPost";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import MyPost from "./components/MyPost";
import EditPost from "./components/EditPost";

function App() {
  const [data, setData] = useState({
    selectedMenu: "posts",
    selectedPostId: null,
    isLoggedIn: false,
  });
  useEffect(() => {
    tokenCheck();
  }, []);
  function handleAddPost() {
    if (!data.isLoggedIn) {
      return setData((prevData) => {
        return {
          ...prevData,
          selectedMenu: "signin",
        };
      });
    }
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
  function handleShowMyPost() {
    if (!data.isLoggedIn) {
      return setData((prevData) => {
        return {
          ...prevData,
          selectedMenu: "signin",
        };
      });
    }
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "myPost",
      };
    });
  }
  function handleSelectPost(postId) {
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "select post",
        selectedPostId: postId,
      };
    });
  }
  function handleEditPost(postId) {
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "edit post",
        selectedPostId: postId,
      };
    });
  }
  function handleBackToMyPost() {
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "myPost",
        selectedPostId: null,
      };
    });
  }
  //auth
  function handleLogout() {
    localStorage.removeItem("token");
    tokenCheck();
  }
  function tokenCheck() {
    const token = localStorage.getItem("token");
    setData((prevData) => {
      return {
        ...prevData,
        selectedMenu: "posts",
        isLoggedIn: token,
      };
    });
  }

  //content
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
  } else if (data.selectedMenu === "myPost") {
    content = <MyPost onEditing={handleEditPost} />;
  } else if (data.selectedMenu === "edit post") {
    content = (
      <EditPost
        postId={data.selectedPostId}
        onCancel={handleBackToMyPost}
        onAfterEdit={handleBackToMyPost}
      />
    );
  }

  return (
    <div className="bg-slate-800 text-slate-300 min-h-screen pb-20">
      <header>
        <Nav
          isLoggedIn={data.isLoggedIn}
          onAddPost={handleAddPost}
          onSignin={handleSignin}
          onLogout={handleLogout}
          onMyPost={handleShowMyPost}
          onResetMenu={handleResetMenu}
        />
      </header>
      {content}
    </div>
  );
}

export default App;
