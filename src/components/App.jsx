import React from "react";
import "./app.less";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Login from "./login/Login";
import SingleRepoPage from "./single-repo-page"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/repo/:id" element={<SingleRepoPage />} />
    </Routes>
  );
};

export default App;
