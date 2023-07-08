import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRepo, openFolder, getBranches } from "../actions/singleRepos";

const RepoPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userLogin = useSelector((state) => state.user.user.login);
  const singleRepo = useSelector((state) => state.singleRepo.repo);
  const branches = useSelector((state) => state.singleRepo.branches);

  console.log(branches);

  const [historyURL, setHistoryURL] = React.useState([]);
  const [currBranch, setCurrBranch] = React.useState("");

  React.useEffect(() => {
    dispatch(getSingleRepo(userLogin, params.id));
    dispatch(getBranches(userLogin, params.id));
    setHistoryURL([
      `https://api.github.com/repos/${userLogin}/${params.id}/contents`,
    ]);
  }, []);

  const getBranchData = async () => {
    //получаем сведения о конкретной ветке, в которой есть ссылка на дерево файлов
    const response = await fetch(currBranch);
    const data = await response.json();
    console.log("response", data.commit.tree.url);

    //получаем дерево файлов с конкретной ветки
    const secondResponse = await fetch(data.commit.tree.url);
    const data2 = await secondResponse.json();

    console.log("data2", data2);
    dispatch({ type: "setOneRepo", payload: data2.tree });
  };

  const openFolderBranchData = async (url) => {

    //получаем дерево файлов с конкретной ветки
    const secondResponse = await fetch(url);
    const data2 = await secondResponse.json();

    console.log("data2", data2);
    dispatch({ type: "setOneRepo", payload: data2.tree });
  };

  React.useEffect(() => {
    getBranchData();
  }, [currBranch]);

  const onClickGoUp = () => {
    dispatch(openFolder(historyURL[historyURL.length - 2]));
    setHistoryURL(historyURL.slice(0, historyURL.length - 1));
  };

  const onClickOpenFolder = (url) => {
    dispatch(openFolder(url));
    setHistoryURL((prev) => [...prev, url]);
  };

  const changeBranch = () => {
    dispatch(openFolder(url));
  };

  console.log(["branch", currBranch]);
  return (
    <div>
      <h3>Репозиторий {params.id} </h3>
      <select name="select" onChange={(e) => setCurrBranch(e.target.value)}>
        {branches.map((item) => (
          <option key={item.name} value={item.commit.url}>
            {item.name}
          </option>
        ))}
      </select>

      {historyURL.length > 1 && <button onClick={onClickGoUp}>.. вверх</button>}
      {singleRepo.map((el) => (
        <div
          key={el.name}
          style={{ display: "flex", msFlexDirection: "column" }}
        >
          <div
            style={{ width: 20, height: 20, border: "1px solid gray" }}
            key={el.name}
          ></div>{" "}
          {(el.type === "dir" ) && (
            <button onClick={() => onClickOpenFolder(el.url)}>Открыть</button>
          )}

          {el.type === "tree" && (
            <button onClick={() => openFolderBranchData(el.url)}>Открыть</button>
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
