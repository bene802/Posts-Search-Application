import React from "react";
import Results, {
  mapStateToProps,
  mapDispatchToProps
} from "../components/Results";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";

const mockStore = configureMockStore();

describe("Results Conponent", () => {
  // test mapStateToProps and mapDispatchToProps functions
  describe("Independent Test", () => {
    it("mapStateToProps works", () => {
      const initialState = {
        postState: {
          posts: []
        },
        searchState: {
          searchText: "testSearchText"
        }
      };
      const expectedObj = {
        searchText: "testSearchText",
        posts: []
      };

      expect(mapStateToProps(initialState)).toEqual(expectedObj);
    });
    // editSelect test
    it("should dispatch editSelect action properly", () => {
      const dispatch = jest.fn();
      const post = [];
      mapDispatchToProps(dispatch).editSelect(post);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "EDIT_SELECT",
        post: post
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
          searchText: "testSearchText"
        }
      };
      let wrapper, store;
      store = mockStore(initialState);
      // Shallow render the container passing in the mock store
      wrapper = shallow(<Results store={store} />);
      const expectedObj = {
        posts: [],
        searchText: "testSearchText"
      };
      const returnedSearchText = wrapper.props().children.props.searchText;
      const returnedPosts = wrapper.props().children.props.posts;
      expect({ searchText: returnedSearchText, posts: returnedPosts }).toEqual(
        expectedObj
      );
    });
  });
});
