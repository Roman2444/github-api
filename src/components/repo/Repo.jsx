import React from "react";
import "./repo.less";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/button";
const Repo = (props) => {
  const navigate = useNavigate();
  const repo = props.repo;

  return (
    <div className="repo">
      <div className="repo-header">
        <div className="repo-header-name">
          <b>{repo.name}</b>
        </div>
        <div className="repo-header-stars">
          Количество звезд: {repo.stargazers_count}
        </div>
      </div>
      <div className="repo-last-commit">
        Последний коммит: {repo.updated_at}
      </div>
      {repo.description && (
        <div className="repo-description">Описание: {repo.description}</div>
      )}
      <MyButton onClick={() => navigate(`/repo/${repo.name}`)}>
        Открыть репозиторий
      </MyButton>
    </div>
  );
};

export default Repo;
