const initialState = {
  repo: [],
  isLoading: true,
};

export default function reposReducer(state = initialState, action) {
  switch (action.type) {
    case "singleRepo/load-start":
      return {
        ...state,
        isLoading: true,
      };

    case "singleRepo/load-success":
      return {
        ...state,
        repo: action.payload,
        isLoading: false,
      };

    case "singleRepo/load-error":
      return {
        ...state,
        repo: [],
        isLoading: false,
      };

    default:
      return state;
  }
}
