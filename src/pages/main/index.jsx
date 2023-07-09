import React from "react";
import "./main.less";
import { useSelector, useDispatch } from "react-redux";
import { getUserRepos } from "../../redusers/actions/repos";
import Repo from "../../components/repo/Repo";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/button";
import MyInput from "../../components/input";
import Loader from "../../components/loader";
import { Header } from "../../components/header";
import PageLayout from "../../components/page-layout";

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

  return (
    <PageLayout>
      <Header />
      <h2>Главная страница</h2>
      <MyInput
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <h3>Список репозиториев:</h3>
      {isLoading ? (
        <Loader />
      ) : (
        filterValue.map((repo) => <Repo key={repo.id} repo={repo} />)
      )}
      {!filterValue.length && <p>Репозитории не найдены</p>}
    </PageLayout>
  );
};

export default Main;
