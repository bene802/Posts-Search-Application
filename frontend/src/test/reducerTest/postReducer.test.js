import postReducer from "../../reducers/postReducer";

describe("post reducer", () => {
  let dummyState;
  beforeEach(() => {
    dummyState = {
      posts: [
        { id: 1, userId: 1, title: "title1", body: "body1" },
        { id: 2, userId: 2, title: "title2", body: "body2" }
      ],
      edit: {
        id: 1,
        userId: 1,
        title: "editTitle",
        body: "editBody"
      }
    };
  });

  // init test
  it("should return the initial state", () => {
    expect(postReducer(undefined, {})).toEqual({
      posts: [],
      edit: {
        id: 0,
        userId: 0,
        title: "",
        body: ""
      }
    });
  });

  // test edit save
  it("should handle EDIT_SAVE", () => {
    const expectedObj = {
      posts: [
        { id: 1, userId: 1, title: "editTitle", body: "editBody" },
        { id: 2, userId: 2, title: "title2", body: "body2" }
      ],
      edit: {
        id: 1,
        userId: 1,
        title: "editTitle",
        body: "editBody"
      }
    };
    expect(
      postReducer(dummyState, {
        type: "EDIT_SAVE"
      })
    ).toEqual(expectedObj);
  });

  // test load data
  it("should handle LOAD_DATA", () => {
    const dummyInput = [
      { id: 1, userId: 1, title: "editTitle", body: "editBody" },
      { id: 2, userId: 2, title: "title2", body: "body2" }
    ]; // pass into action
    const expectedObj = {
      posts: dummyInput,
      edit: dummyState.edit
    };
    expect(
      postReducer(dummyState, {
        type: "LOAD_DATA",
        output: dummyInput
      })
    ).toEqual(expectedObj);
  });

  // test edit title
  it("should handle EDIT_TITLE", () => {
    const expectedObj = {
      posts: [
        { id: 1, userId: 1, title: "title1", body: "body1" },
        { id: 2, userId: 2, title: "title2", body: "body2" }
      ],
      edit: {
        id: 1,
        userId: 1,
        title: "I am editing title",
        body: "editBody"
      }
    };
    expect(
      postReducer(dummyState, {
        type: "EDIT_TITLE",
        title: "I am editing title"
      })
    ).toEqual(expectedObj);
  });

  // test edit content
  it("should handle EDIT_CONTENT", () => {
    const expectedObj = {
      posts: [
        { id: 1, userId: 1, title: "title1", body: "body1" },
        { id: 2, userId: 2, title: "title2", body: "body2" }
      ],
      edit: {
        id: 1,
        userId: 1,
        title: "editTitle",
        body: "I am editing body"
      }
    };
    expect(
      postReducer(dummyState, {
        type: "EDIT_CONTENT",
        content: "I am editing body"
      })
    ).toEqual(expectedObj);
  });

  // test edit select
  it("should handle EDIT_SELECT", () => {
    const expectedObj = {
      posts: [
        { id: 1, userId: 1, title: "title1", body: "body1" },
        { id: 2, userId: 2, title: "title2", body: "body2" }
      ],
      edit: { id: 1, userId: 1, title: "title1", body: "body1" }
    };
    const editingPost = { id: 1, userId: 1, title: "title1", body: "body1" };
    expect(
      postReducer(dummyState, {
        type: "EDIT_SELECT",
        post: editingPost
      })
    ).toEqual(expectedObj);
  });
});
