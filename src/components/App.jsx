import React from "react";
import "./app.less";
import { Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Login from "./login/Login";
import RepoPage from "./repo-page/index"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/repo/:id" element={<RepoPage />} />
    </Routes>
  );
};

export default App;
