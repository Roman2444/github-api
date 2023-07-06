import axios from "axios";
 

export const getUser = (login) => {
    return async (dispatch) => {
      dispatch({ type: "user/load-start" });
      try {
        const response = await axios.get(
          `https://api.github.com/users/${login}`
        );
  
        dispatch({ type: "user/load-success", payload: response.data });
        //console.log(response.data);
      } catch (error) {
        console.log(error);
        dispatch({ type: "user/load-error" });
      }
    };
  };
  