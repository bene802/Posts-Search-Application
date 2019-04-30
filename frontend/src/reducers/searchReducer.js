const initialState = {
  searchText: "",
  typingText: ""
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_TYPING":
      return Object.assign({}, state, { typingText: action.typingText });
    case "SEARCH_SUBMIT":
      return Object.assign({}, state, { searchText: state.typingText });
    case "SELECT_SUGGEST":
      return Object.assign({}, state, { typingText: action.searchText });
    default:
      return state;
  }
};
export default searchReducer;
