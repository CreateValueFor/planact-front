import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import "./app.css";
import axios from "axios";
import BASE_URL from "./modules/host";
import Idea from "./views/Idea";

function App() {
  return (
    <div style={{ backgroundColor: "#fcfcfe", minHeight: "100vh" }}>
      <Route path="/" exact component={Home} />
      <Route path="/idea" component={Idea} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
