import axios from "axios";

export const getSingleRepo = (login, repoName) => {
  return async (dispatch) => {
    dispatch({ type: "singleRepo/load-start" });
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${login}/${repoName}/contents`
      );

      dispatch({ type: "singleRepo/load-success", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "singleRepo/load-error" });
    }
  };
};
export const openFolder = (url) => {
  return async (dispatch) => {
    dispatch({ type: "singleRepo/load-start" });
    try {
      const response = await axios.get(url);

      dispatch({ type: "singleRepo/load-success", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "singleRepo/load-error" });
    }
  };
};

//получаем все ветки репозитория
export const getBranches = (login, repoName) => {
  return async (dispatch) => {
    dispatch({ type: "branches/load-start" });
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${login}/${repoName}/branches`
      );

      dispatch({ type: "branches/load-success", payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "branches/load-error" });
    }
  };
};

export const getBranchData = (currBranch) => {
  //получаем сведения о конкретной ветке,
  // в которой есть ссылка на дерево файлов

  return async (dispatch) => {
    dispatch({ type: "singleRepo/load-start" });
    try {
      const response = await fetch(currBranch);
      const data = await response.json();

      //получаем дерево файлов с конкретной ветки, по полученной ссылке
      const secondResponse = await fetch(data.commit.tree.url);
      const data2 = await secondResponse.json();

      dispatch({ type: "singleRepo/load-success", payload: data2.tree });
    } catch (error) {
      console.log(error);
      dispatch({ type: "singleRepo/load-error" });
    }
  };
};

//получаем дерево файлов с конкретной ветки
export const openFolderBranchData = (url) => {
  return async (dispatch) => {
    dispatch({ type: "singleRepo/load-start" });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: "singleRepo/load-success", payload: data.tree });
    } catch (error) {
      console.log(error);
      dispatch({ type: "singleRepo/load-error" });
    }
  };
};
