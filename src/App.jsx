import { useContext } from "react";
import { useSelector } from "react-redux";

import { MenuContext } from "./store/Menu-Context";
import { UserContext } from "./store/User-Context";

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
  const selectedMenu = useSelector((state) => state.ui.selectedMenu);
  const { menuContextState } = useContext(MenuContext);
  const { userContextState } = useContext(UserContext);
  // console.log(userContextState);
  // const { selectedMenu } = menuContextState;
  // console.log(selectedMenu);
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
    <div className="bg-slate-800 text-slate-300 min-h-screen pb-20">
      <header>
        <Nav />
      </header>
      <MainContent />
    </div>
  );
}

export default App;
