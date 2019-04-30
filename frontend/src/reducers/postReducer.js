const initialState = {
  posts: [],
  edit: {
    id: 0,
    userId: 0,
    title: "",
    body: ""
  }
};
const updateItemPosts = (array, editPost) => {
  const updatedItems = array.map(a => {
    if (a.id !== editPost.id) {
      return a;
    }
    // find the item and assign editPost to it.
    return Object.assign({}, editPost);
  });
  return updatedItems;
};

const editSave = state => {
  const posts = updateItemPosts(state.posts, state.edit);
  return Object.assign({}, state, { posts: posts });
};

const editTitle = (state, text) => {
  const edit = { ...state.edit, title: text };
  return Object.assign({}, state, { edit: edit });
};

const editContent = (state, text) => {
  const edit = { ...state.edit, body: text };
  return Object.assign({}, state, { edit: edit });
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_SAVE":
      return editSave(state);
    case "LOAD_DATA":
      return Object.assign({}, state, { posts: action.output });
    case "EDIT_TITLE":
      return editTitle(state, action.title);
    case "EDIT_CONTENT":
      return editContent(state, action.content);
    case "EDIT_SELECT":
      return Object.assign({}, state, { edit: action.post });
    default:
      return state;
  }
};

export default postReducer;
