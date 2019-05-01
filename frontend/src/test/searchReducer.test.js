import searchReducer from "../reducers/searchReducer";

describe("search reducer", () => {
  let dummyState;
  beforeEach(() => {
    dummyState = {
      searchText: "searchText",
      typingText: "searchText"
    };
  });

  // init test
  it("should return the initial state", () => {
    expect(searchReducer(undefined, {})).toEqual({
      searchText: "",
      typingText: ""
    });
  });

  // test search typing
  it("should handle SEARCH_TYPING", () => {
    const expectedObj = {
      typingText: "typing",
      searchText: "searchText"
    };
    expect(
      searchReducer(dummyState, {
        type: "SEARCH_TYPING",
        typingText: "typing"
      })
    ).toEqual(expectedObj);
  });

  // test search submit
  it("should handle SEARCH_SUBMIT", () => {
    const expectedObj = {
      typingText: "searchText",
      searchText: "searchText"
    };
    expect(
      searchReducer(dummyState, {
        type: "SEARCH_SUBMIT",
        searchText: "typing"
      })
    ).toEqual(expectedObj);
  });

  // test select one of suggestions
  it("should handle SELECT_SUGGEST", () => {
    const expectedObj = {
      typingText: "select one of suggestions",
      searchText: "searchText"
    };
    expect(
      searchReducer(dummyState, {
        type: "SELECT_SUGGEST",
        searchText: "select one of suggestions"
      })
    ).toEqual(expectedObj);
  });
});
