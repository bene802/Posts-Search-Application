import { createStore } from "redux";
import Search from "../components/Search";

const initialState = {
  searchInput: "",
  posts: [],
  searchList: []
};

const reducer = (state = initialState, action) => {
  //console.log(state, action);
  switch (action.type) {
    case "SEARCH":
      return Object.assign({}, state);
    case "TYPING":
      const output = Search.searchTyping(state, action.searchText);
      return Object.assign({}, state, {
        searchInput: action.searchText,
        searchList: output
      });
    case "START":
      return Object.assign({}, state, {
        posts: action.output,
        searchList: action.output
      });
    case "EDIT":
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
