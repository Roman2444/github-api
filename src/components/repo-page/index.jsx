import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRepo, openFolder, getBranches, getBranchData, openFolderBranchData } from "../actions/singleRepos";

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
            <button onClick={() => onClickOpenFolderBranchData(el.url)}>Открыть</button>
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
