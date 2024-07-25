import { useContext } from "react";

import UserContextProvider from "./store/User-Context";
import PostContextProvider from "./store/Post-Context";
import MenuContextProvider, { MenuContext } from "./store/Menu-Context";

import Posts from "./components/Posts";
import Nav from "./components/Nav";
import NewPost from "./components/NewPost";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import MyPost from "./components/MyPost";
import EditPost from "./components/EditPost";

function App() {
  // const [data, setData] = useState({
  //   selectedMenu: "posts",
  //   selectedPostId: null,
  //   isLoggedIn: false,
  // });
  const { menuContextState } = useContext(MenuContext);
  const { selectedMenu } = menuContextState;
  console.log(selectedMenu);
  function MainContent() {
    //content
    if (selectedMenu === "newPost") {
      return <NewPost />;
    } else if (selectedMenu === "signin") {
      return <Signin />;
    } else if (selectedMenu === "signup") {
      return <Signup />;
    } else if (selectedMenu === "myPost") {
      return <MyPost />;
    } else if (selectedMenu === "editPost") {
      return <EditPost />;
    }
    return <Posts />;
  }

  return (
    <UserContextProvider>
      <PostContextProvider>
        <MenuContextProvider>
          <div className="bg-slate-800 text-slate-300 min-h-screen pb-20">
            <header>
              <Nav />
            </header>
            <MainContent />
          </div>
        </MenuContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  );
}

export default App;
