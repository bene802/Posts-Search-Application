import { combineReducers } from "redux";
import postReducer from "./postReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  postState: postReducer,
  searchState: searchReducer
});

export default rootReducer;
