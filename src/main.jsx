import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./store/User-Context.jsx";
import PostContextProvider from "./store/Post-Context.jsx";
import MenuContextProvider from "./store/Menu-Context.jsx";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <MenuContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </MenuContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
