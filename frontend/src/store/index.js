import { createStore } from "redux";

const initialState = {
  searchInput: "",
  posts: [
    {
      id: 1,
      userId: 11,
      title: "qui est esse",
      body:
        "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      userId: 22,
      id: 2,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body:
        "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    }
  ]
};

const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case "TYPING":
      return Object.assign({}, state, { searchInput: action.searchText });
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
