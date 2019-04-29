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
      searchRes.sort((o1, o2) => {
        return o1.title.localeCompare(o2.title);
      });
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
      for (const i in postsCopy) {
        if (postsCopy[i].id === state.editPost.id) {
          postsCopy[i].title = state.editPost.title;
          postsCopy[i].body = state.editPost.body;
          break;
        }
      }
      let searchListCopy = state.searchList.map(a => ({ ...a }));
      for (const i in searchListCopy) {
        if (searchListCopy[i].id === state.editPost.id) {
          searchListCopy[i].title = state.editPost.title;
          searchListCopy[i].body = state.editPost.body;
          break;
        }
      }
      let searchResCopy = state.searchRes.map(a => ({ ...a }));
      for (const i in searchResCopy) {
        if (searchResCopy[i].id === state.editPost.id) {
          searchResCopy[i].title = state.editPost.title;
          searchResCopy[i].body = state.editPost.body;
          break;
        }
      }
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
