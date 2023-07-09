import React from "react";
import "./main.less";
import { useSelector, useDispatch } from "react-redux";
import { getUserRepos } from "../../redusers/actions/repos";
import Repo from "./repo/Repo";
import { useNavigate } from "react-router-dom";
import MyButton from "../button";
import MyInput from "../input";

const Main = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos.items);
  const isLoading = useSelector((state) => state.repos.isLoading);
  const user = useSelector((state) => state.user.user.login);

  const [searchValue, setSearchValue] = React.useState("");
  const filterValue = React.useMemo(() => {
    if (repos) {
      return repos.filter((el) =>
        el.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }, [repos, searchValue]);

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getUserRepos(user));
    }
  }, [user]);

  const handleLogout = () => {
    dispatch({ type: "user/clear" });
    dispatch({ type: "repo/clear" });
  };

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <h2>Main</h2>
      <MyButton onClick={handleLogout}>выйти</MyButton>
      <MyInput
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <h3>Список репозиториев:</h3>
      {filterValue.length > 0 ? (
        filterValue.map((repo) => <Repo key={repo.id} repo={repo} />)
      ) : (
        <p>Репозитории не найдены</p>
      )}
    </>
  );
};

export default Main;
