import React from "react";
import { Route } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import "./app.css";
import Idea from "./views/Idea";
import Uploads from "./views/Uploads";

function App() {
  return (
    <div style={{ backgroundColor: "#fcfcfe", minHeight: "100vh" }}>
      <Route path="/" exact component={Home} />
      <Route path="/idea" component={Idea} />
      <Route path="/login" component={Login} />
      <Route path="/uploads" component={Uploads} />
    </div>
  );
}

export default App;
