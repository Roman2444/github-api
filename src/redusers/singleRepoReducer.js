const initialState = {
  repo: [],
  branches: [],
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

      case "setOneRepo":
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

    case "branches/load-start":
      return {
        ...state,
        isLoading: true,
      };

    case "branches/load-success":
      return {
        ...state,
        branches: action.payload,
        isLoading: false,
      };

    case "branches/load-error":
      return {
        ...state,
        branches: [],
        isLoading: false,
      };

    default:
      return state;
  }
}
