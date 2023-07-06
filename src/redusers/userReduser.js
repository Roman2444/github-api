//https://api.github.com/users/

const SET_USER = "SET_USER";

const initialState = {
  user: {},
  isLoading: true,
  exist: false,
};

export default function getUser(state = initialState, action) {
  switch (action.type) {
    case "user/load-start":
      return {
        ...state,
        isLoading: true,
      };

    case "user/load-success":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        exist: true,
      };

    case "user/load-error":
      return {
        ...state,
        isLoading: false,
        user: {},
      };

    case "user/clear":
      return {
        ...state,
        isLoading: false,
        user: {},
      };

    default:
      return state;
  }
}
