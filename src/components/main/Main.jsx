import React from "react";
import "./main.less";
import { useSelector, useDispatch } from "react-redux";
import { getUserRepos } from "../actions/repos";
import Repo from "./repo/Repo";
import { useNavigate} from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos.items);
  const isLoading = useSelector((state) => state.repos.isLoading);
  const user = useSelector((state) => state.user.user.login);

  React.useEffect(() => {
    dispatch(getUserRepos(user));
  }, []);
  
  if (!user) {
    navigate('/login');
  }
  const handleLogout = () => {
    dispatch({ type: "user/clear" });
    dispatch({ type: "repo/clear" });
  }

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <h2>Main</h2>
      <button onClick={handleLogout}>выйти</button>
      <h3>Список репозиториев:</h3>
      {repos.map((repo) => {
        return <Repo key={repo.id} repo={repo} />;
      })}
    </>
  );
};

export default Main;
