import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const RepoPage = () => {
  const params = useParams();
  const userLogin = useSelector((state) => state.user.user.login);

  const [repo, setRepo] = React.useState([]);
  //const [prevURL, setPrevURL] = React.useState("");
  const [historyURL, setHistoryURL] = React.useState([]);

  const getOneRepo = async (login, repoName) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${login}/${repoName}/contents`
      );
      setRepo(response.data);
      //dispatch({ type: "repo/load-success", payload: response.data });
      console.log(["response", response.data]);
      setHistoryURL(
        [`https://api.github.com/repos/${login}/${repoName}/contents`]
      );
    } catch (error) {
      console.log(error);
      //  dispatch({ type: "repo/load-error" });
    }
  };
  const openFolder = async (url) => {
    try {
      const response = await axios.get(url);
      setRepo(response.data);
      setHistoryURL((prev) => [...prev, url]);

      //dispatch({ type: "repo/load-success", payload: response.data });
      console.log(["response", response.data]);
    } catch (error) {
      console.log(error);
      //  dispatch({ type: "repo/load-error" });
    }
  };

  React.useEffect(() => {
    getOneRepo(userLogin, params.id);
  }, []);

 const onClickGoUp = () => {
    openFolder(historyURL[historyURL.length - 2])
    setHistoryURL(historyURL.slice(0, historyURL.length - 2));
  }
console.log(["currentURL", historyURL]);
  return (
    <div>
      <h3>Репозиторий {params.id} </h3>

      {historyURL.length > 1 &&<button onClick={onClickGoUp}>.. вверх</button>}
      {repo.map((el) => (
        <div
          key={el.name}
          style={{ display: "flex", msFlexDirection: "column" }}
        >
          <div
            style={{ width: 20, height: 20, border: "1px solid gray" }}
            key={el.name}
          ></div>{" "}
          {el.type === "dir" && (
            <button onClick={() => openFolder(el.url)}>Открыть</button>
          )}
          <div>{el.name}</div>
          {el.type === "file" && <div> размер файла: {el.size}</div>}
        </div>
      ))}
    </div>
  );
};

export default RepoPage;
