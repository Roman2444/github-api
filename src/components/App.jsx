import React from "react";
import "./app.less";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import Login from "../pages/login";
import SingleRepoPage from "../pages/single-repo-page";

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
