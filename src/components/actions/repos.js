import axios from "axios";
import { setRepos } from "../../redusers/reposReducer";

export const getUserRepos = (login) => {
  return async (dispatch) => {
    dispatch({ type: "repo/load-start" });
    try {
      const response = await axios.get(
        `https://api.github.com/users/${login}/repos`
      );

      dispatch({ type: "repo/load-success", payload: response.data });
      //console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "repo/load-error" });
    }
  };
};
