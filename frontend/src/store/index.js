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
var updateObj = (obj, value) => {
  return Object.assign({}, obj, value);
};

var updateItemPosts = (array, editPost) => {
  const updatedItems = array.map(a => {
    if (a.id !== editPost.id) {
      return a;
    }
    // find the item and assign editPost to it.
    return Object.assign({}, editPost);
  });
  return updatedItems;
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH":
      let exactOutput = Search.searchTyping(state, action.searchText, "");
      exactOutput.sort((o1, o2) => {
        return o1.title.localeCompare(o2.title);
      });
      return updateObj(state, {
        searchInput: action.searchText,
        output: exactOutput
      });
    case "TYPING":
      const fuzzyOutput = Search.searchTyping(state, action.searchText, "*");
      return updateObj(state, {
        searchInput: action.searchText,
        suggestList: fuzzyOutput
      });
    case "START":
      return updateObj(state, { posts: action.output });
    case "SELECTSUGGEST":
      return updateObj(state, { searchInput: action.searchText });
    case "EDITSELECT":
      return updateObj(state, { editPost: action.post });
    case "EDITTITLE":
      const editPost = updateObj(state.editPost, { title: action.title });
      return updateObj(state, { editPost: editPost });
    case "EDITCONTENT":
      const content = updateObj(state.editPost, { body: action.content });
      return updateObj(state, { editPost: content });
    case "EDITSAVE":
      // save to posts
      const posts = updateItemPosts(state.posts, state.editPost);
      // save to suggestList
      const suggestList = updateItemPosts(state.suggestList, state.editPost);
      // save to output
      const output = updateItemPosts(state.output, state.editPost);
      output.sort((o1, o2) => {
        return o1.title.localeCompare(o2.title);
      });
      return updateObj(state, {
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
