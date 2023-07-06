import axios from "axios";

export const getSingleRepo = async (login, repoName) => {
  return async (dispatch) => {
    dispatch({ type: "singleRepo/load-start" });
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${login}/${repoName}/contents`
      );
      setRepo(response.data);
      dispatch({ type: "singleRepo/load-success", payload: response.data });
      console.log(["response", response.data]);
    //   setHistoryURL([
    //     `https://api.github.com/repos/${login}/${repoName}/contents`,
    //   ]);
    } catch (error) {
      console.log(error);
      dispatch({ type: "singleRepo/load-error" });
    }
  };
};
export const openFolder = async (url) => {
    dispatch({ type: "singleRepo/load-start" });
  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      setRepo(response.data);
    //   setHistoryURL((prev) => [...prev, url]);

      dispatch({ type: "singleRepo/load-success", payload: response.data });
      console.log(["response", response.data]);
    } catch (error) {
      console.log(error);
       dispatch({ type: "singleRepo/load-error" });
    }
  };
};
