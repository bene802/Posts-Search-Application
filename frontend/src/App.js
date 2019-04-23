import React from "react";
import "./App.css";
import store from "./store/index";
import { Provider } from "react-redux";
import Intro from "./components/Intro";
import Posts from "./components/Posts";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Intro />
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
