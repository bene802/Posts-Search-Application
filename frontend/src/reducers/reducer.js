import {
  updateObj,
  search,
  typing,
  editTitle,
  editContent,
  editSave
} from "./reducerFunctions";

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

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "START":
      return updateObj(state, { posts: action.output });
    case "SEARCH":
      return search(state, action);
    case "TYPING":
      return typing(state, action);
    case "SELECTSUGGEST":
      return updateObj(state, { searchInput: action.searchText });
    case "EDITSELECT":
      return updateObj(state, { editPost: action.post });
    case "EDITTITLE":
      return editTitle(state, action);
    case "EDITCONTENT":
      return editContent(state, action);
    case "EDITSAVE":
      return editSave(state);
    default:
      return state;
  }
};
