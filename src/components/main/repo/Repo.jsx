import React from "react";
import "./repo.less";
import { useNavigate } from "react-router-dom";

const Repo = (props) => {
  const navigate = useNavigate();
  const repo = props.repo;

  return (
    <div className="repo">
      <div className="repo-header">
        <div className="repo-header-name">{repo.name}</div>
        <div className="repo-header-stars">
          Количество звезд: {repo.stargazers_count}
        </div>
      </div>
      <div className="repo-last-commit">
        Последний коммит: {repo.updated_at}
      </div>
      <a href={repo.html_url} className="repo-link">
        Ссылка на репозиторий: {repo.html_url}
      </a>
      <button onClick={() => navigate(`/repo/${repo.name}`)}>
        Открыть репозиторий
      </button>
    </div>
  );
};

export default Repo;
