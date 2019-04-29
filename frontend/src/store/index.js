import { createStore } from "redux";
import Search from "../components/Search";

const initialState = {
  searchInput: "",
  posts: [],
  suggestList: [],
  output: [],
  editPost: {
    title: "",
    id: 0,
    body: "",
    userId: 0
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH":
      let exactOutput = Search.searchTyping(state, action.searchText, "");
      exactOutput.sort((o1, o2) => {
        return o1.title.localeCompare(o2.title);
      });
      return Object.assign({}, state, {
        searchInput: action.searchText,
        output: exactOutput
      });
    case "TYPING":
      const fuzzyOutput = Search.searchTyping(state, action.searchText, "*");
      return Object.assign({}, state, {
        searchInput: action.searchText,
        suggestList: fuzzyOutput
      });
    case "START":
      return Object.assign({}, state, {
        posts: action.output
      });
    case "SELECTSUGGEST":
      return Object.assign({}, state, { searchInput: action.searchText });
    case "EDITSELECT":
      return Object.assign({}, state, { editPost: action.post });
    case "EDITTITLE":
      const editPost = Object.assign({}, state.editPost, {
        title: action.title
      });
      return Object.assign({}, state, {
        editPost: editPost
      });
    case "EDITCONTENT":
      const content = Object.assign({}, state.editPost, {
        body: action.content
      });
      return Object.assign({}, state, { editPost: content });
    case "EDITSAVE":
      // save to posts
      let posts = state.posts.map(p => {
        if (p.id !== state.editPost.id) {
          return p;
        }
        return Object.assign({}, state.editPost);
      });
      // save to suggestList
      let suggestList = state.suggestList.map(p => {
        if (p.id !== state.editPost.id) {
          return p;
        }
        return Object.assign({}, state.editPost);
      });
      // save to output
      let output = state.output.map(p => {
        if (p.id !== state.editPost.id) {
          return p;
        }
        return Object.assign({}, state.editPost);
      });
      output.sort((o1, o2) => {
        return o1.title.localeCompare(o2.title);
      });
      return Object.assign({}, state, {
        posts: posts,
        suggestList: suggestList,
        output: output
      });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
