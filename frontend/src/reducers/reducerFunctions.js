import Search from "../components/Search";
export const updateObj = (obj, value) => {
  return Object.assign({}, obj, value);
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

export const search = (state, action) => {
  let exactOutput = Search.searchTyping(state, action.searchText, "");
  exactOutput.sort((o1, o2) => {
    return o1.title.localeCompare(o2.title);
  });
  return updateObj(state, {
    searchInput: action.searchText,
    output: exactOutput
  });
};

export const typing = (state, action) => {
  const fuzzyOutput = Search.searchTyping(state, action.searchText, "*");
  return updateObj(state, {
    searchInput: action.searchText,
    suggestList: fuzzyOutput
  });
};

export const editTitle = (state, action) => {
  const editPost = updateObj(state.editPost, { title: action.title });
  return updateObj(state, { editPost: editPost });
};

export const editContent = (state, action) => {
  const content = updateObj(state.editPost, { body: action.content });
  return updateObj(state, { editPost: content });
};

export const editSave = state => {
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
};
