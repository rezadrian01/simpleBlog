import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./store/User-Context.jsx";
import PostContextProvider from "./store/Post-Context.jsx";
import MenuContextProvider from "./store/Menu-Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <MenuContextProvider>
          <App />
        </MenuContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
