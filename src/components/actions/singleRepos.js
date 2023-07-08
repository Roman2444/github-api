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
            console.log("branches/load-start", response);
        dispatch({ type: "branches/load-success", payload: response.data });

      } catch (error) {
        console.log(error);
        dispatch({ type: "branches/load-error" });
      }
    };
  };