import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleRepo,
  openFolder,
  getBranches,
  getBranchData,
  openFolderBranchData,
} from "../actions/singleRepos";
import MyInput from "../input";
import MySelect from "../select";

const RepoPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userLogin = useSelector((state) => state.user.user.login);
  const singleRepo = useSelector((state) => state.singleRepo.repo);
  const branches = useSelector((state) => state.singleRepo.branches);
  const isLoading = useSelector((state) => state.singleRepo.isLoading);


  const [historyURL, setHistoryURL] = React.useState([]);
  const [currBranch, setCurrBranch] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  const filterValue = React.useMemo(() => {
    if (singleRepo.length) {
      return singleRepo.filter((el) =>
        el.name
          ? el.name.toLowerCase().includes(searchValue.toLowerCase())
          : el.path.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }, [singleRepo, searchValue]);

  React.useEffect(() => {
    dispatch(getSingleRepo(userLogin, params.id));
    dispatch(getBranches(userLogin, params.id));
    setHistoryURL([
      `https://api.github.com/repos/${userLogin}/${params.id}/contents`,
    ]);
  }, []);

  React.useEffect(() => {
    dispatch(getBranchData(currBranch));
  }, [currBranch]);

  const onClickGoUp = () => {
    dispatch(openFolder(historyURL[historyURL.length - 2]));
    setHistoryURL(historyURL.slice(0, historyURL.length - 1));
  };

  const onClickOpenFolder = (url) => {
    dispatch(openFolder(url));
    setHistoryURL((prev) => [...prev, url]);
  };

  const onClickOpenFolderBranchData = (url) => {
    dispatch(openFolderBranchData(url));
    setHistoryURL((prev) => [...prev, url]);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <h3>Репозиторий {params.id} </h3>
      <MyInput
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      ></MyInput>
      <MySelect onChange={setCurrBranch} options={branches} defaultValue={'выберите ветку'}>
      </MySelect>

      {historyURL.length > 1 && <button onClick={onClickGoUp}>.. вверх</button>}
      {filterValue?.map((el) => (
        <div
          key={el.name}
          style={{ display: "flex", msFlexDirection: "column" }}
        >
          <div
            style={{ width: 20, height: 20, border: "1px solid gray" }}
          ></div>{" "}
          {el.type === "dir" && (
            <button onClick={() => onClickOpenFolder(el.url)}>Открыть</button>
          )}
          {el.type === "tree" && (
            <button onClick={() => onClickOpenFolderBranchData(el.url)}>
              Открыть
            </button>
          )}
          <div>{el.name || el.path}</div>
          {(el.type === "file" || el.type === "blob") && (
            <div> размер файла: {el.size}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RepoPage;
