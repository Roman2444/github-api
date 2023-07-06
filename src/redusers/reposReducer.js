const SET_REPOS = "SET_REPOS";

const initialState = {
  items: [],
  isLoading: true,
};

export default function reposReducer(state = initialState, action) {
  switch (action.type) {
    case "repo/load-start":
      return {
        ...state,
        isLoading: true,
      };

    case "repo/load-success":
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };

    case "repo/load-error":
      return {
        ...state,
        items: [],
        isLoading: false,
      };
      case "repo/clear":
        return {
          ...state,
          items: [],
          isLoading: false,
        };

    default:
      return state;
  }
}

export const setRepos = (repos) => ({ type: SET_REPOS, payload: repos });
