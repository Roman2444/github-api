import { combineReducers, createStore, applyMiddleware } from "redux";
import reposReducer from "./reposReducer";
import userReducer from "./userReduser"
import singleRepoReducer from "./singleRepoReducer"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  repos: reposReducer,
  user: userReducer,
  singleRepo: singleRepoReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
