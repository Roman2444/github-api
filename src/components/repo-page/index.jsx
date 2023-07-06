import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRepo, openFolder } from "../actions/singleRepos";

const RepoPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const userLogin = useSelector((state) => state.user.user.login);
  const singleRepo = useSelector((state) => state.singleRepo.repo);

  const [historyURL, setHistoryURL] = React.useState([]);

  React.useEffect(() => {
    dispatch(getSingleRepo(userLogin, params.id));
    setHistoryURL([
      `https://api.github.com/repos/${userLogin}/${params.id}/contents`,
    ]);
  }, []);

  const onClickGoUp = () => {
    dispatch(openFolder(historyURL[historyURL.length - 2]));
    setHistoryURL(historyURL.slice(0, historyURL.length - 1));
  };

  const onClickOpenFolder = (url) => {
    dispatch(openFolder(url));
    setHistoryURL((prev) => [...prev, url]);
  };

  console.log(["historyURL", historyURL]);
  return (
    <div>
      <h3>Репозиторий {params.id} </h3>

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
          {el.type === "dir" && (
            <button onClick={() => onClickOpenFolder(el.url)}>Открыть</button>
          )}
          <div>{el.name}</div>
          {el.type === "file" && <div> размер файла: {el.size}</div>}
        </div>
      ))}
    </div>
  );
};

export default RepoPage;
