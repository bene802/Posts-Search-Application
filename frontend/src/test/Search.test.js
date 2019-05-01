import React from "react";
import Search, {
  mapStateToProps,
  mapDispatchToProps
} from "../components/Search";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";

const mockStore = configureMockStore();

describe("Search Conponent", () => {
  // test mapStateToProps and mapDispatchToProps functions
  describe("Independent Test", () => {
    it("mapStateToProps works", () => {
      const initialState = {
        postState: {
          posts: []
        },
        searchState: {
          searchText: "testSearchText",
          typingText: "testTypingText"
        }
      };
      const expectedObj = {
        searchText: "testSearchText",
        typingText: "testTypingText",
        posts: []
      };

      expect(mapStateToProps(initialState)).toEqual(expectedObj);
    });
    // handleTyping test
    it("should dispatch handleTyping action properly", () => {
      const dispatch = jest.fn();
      const event = {
        target: {
          value: "typing"
        }
      };
      mapDispatchToProps(dispatch).handleTyping(event);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "SEARCH_TYPING",
        typingText: "typing"
      });
    });
    // handleSearch test
    it("should dispatch handleSearch action properly", () => {
      const dispatch = jest.fn();
      const v = "search submit";
      const e = { preventDefault: jest.fn() };
      mapDispatchToProps(dispatch).handleSearch(e, v);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "SEARCH_SUBMIT",
        searchText: "search submit"
      });
    });
    // selectSuggest test
    it("should dispatch selectSuggest action properly", () => {
      const dispatch = jest.fn();
      const v = "select suggest";
      mapDispatchToProps(dispatch).selectSuggest(v);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "SELECT_SUGGEST",
        searchText: "select suggest"
      });
    });
  });
  // test if store is passed as props properly
  describe("Mock Store Test", () => {
    it("Store values were correctly passed as props", () => {
      const initialState = {
        postState: {
          posts: []
        },
        searchState: {
          searchText: "testSearchText",
          typingText: "testTypingText"
        }
      };
      let wrapper, store;
      store = mockStore(initialState);
      // Shallow render the container passing in the mock store
      wrapper = shallow(<Search store={store} />);
      const expectedObj = {
        posts: [],
        searchText: "testSearchText",
        typingText: "testTypingText"
      };
      const returnedSearchText = wrapper.props().children.props.searchText;
      const returnedTypingText = wrapper.props().children.props.typingText;
      const returnedPosts = wrapper.props().children.props.posts;
      expect({
        searchText: returnedSearchText,
        typingText: returnedTypingText,
        posts: returnedPosts
      }).toEqual(expectedObj);
    });
  });
});
