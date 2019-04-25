import { createStore } from "redux";
import Search from "../components/Search";

const initialState = {
  searchInput: "",
  posts: [],
  searchList: [],
  searchRes: [],
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
      let searchRes = Search.searchTyping(state, action.searchText, "");
      return Object.assign({}, state, {
        searchInput: action.searchText,
        searchRes: searchRes
      });
    case "TYPING":
      console.log(state.editPost);
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
    case "EDITSELECT":
      state.editPost = {};
      let selected = Object.assign({}, action.post);
      return Object.assign({}, state, { editPost: selected });
    case "EDITTITLE":
      let t = Object.assign({}, state.editPost, { title: action.title });
      return Object.assign({}, state, { editPost: t });
    case "EDITCONTENT":
      let c = Object.assign({}, state.editPost, { body: action.content });
      return Object.assign({}, state, { editPost: c });
    case "EDITSAVE":
      let postsCopy = state.posts.map(a => ({ ...a }));
      postsCopy.map(p => {
        if (p.id === state.editPost.id) {
          p.title = state.editPost.title;
          p.body = state.editPost.body;
        }
      });
      let searchListCopy = state.searchList.map(a => ({ ...a }));
      searchListCopy.map(p => {
        if (p.id === state.editPost.id) {
          p.title = state.editPost.title;
          p.body = state.editPost.body;
        }
      });
      let searchResCopy = state.searchRes.map(a => ({ ...a }));
      searchResCopy.map(p => {
        if (p.id === state.editPost.id) {
          p.title = state.editPost.title;
          p.body = state.editPost.body;
        }
      });
      return Object.assign({}, state, {
        posts: postsCopy,
        searchList: searchListCopy,
        searchRes: searchResCopy
      });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
