export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return search(state, action);
    case "TYPING":
      return typing(state, action);
    case "SELECTSUGGEST":
      return updateObj(state, { searchInput: action.searchText });
  }
};
