import { createStore } from "redux";
import Search from "../components/Search";

const initialState = {
  searchInput: "",
  posts: [],
  searchList: [],
  searchRes: []
};

const reducer = (state = initialState, action) => {
  //console.log(state, action);
  switch (action.type) {
    case "SEARCH":
      console.log(action.searchText);
      let searchRes = Search.searchTyping(state, action.searchText, "");
      return Object.assign({}, state, {
        searchInput: action.searchText,
        searchRes: searchRes
      });
    case "TYPING":
      let output = Search.searchTyping(state, action.searchText, "*");
      return Object.assign({}, state, {
        searchInput: action.searchText,
        searchList: output
      });
    case "START":
      return Object.assign({}, state, {
        posts: action.output
      });
    case "EDIT":
      return Object.assign({}, state, {});
    case "SELECTVALUE":
      return Object.assign({}, state, { searchInput: action.select });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
