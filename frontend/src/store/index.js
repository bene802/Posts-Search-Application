import { createStore } from "redux";

const initialState = {
  searchInput: "",
  posts: []
};

const reducer = (state = initialState, action) => {
  //console.log(state, action);
  switch (action.type) {
    case "TYPING":
      return Object.assign({}, state, { searchInput: action.searchText });
    case "SEARCH":
      return Object.assign({}, state, { posts: action.output });
    case "START":
      return Object.assign({}, state, { posts: action.output });
    case "EDIT":
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
