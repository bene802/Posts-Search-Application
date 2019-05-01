import React from "react";
import Edit, { mapStateToProps, mapDispatchToProps } from "../components/Edit";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";

const mockStore = configureMockStore();

describe("Edit Conponent", () => {
  // test mapStateToProps and mapDispatchToProps functions
  describe("Independent Test", () => {
    it("mapStateToProps works", () => {
      const initialState = {
        postState: {
          edit: { id: 1, userId: 1, title: "testTitle", body: "testBody" }
        }
      };
      const expectedObj = {
        id: 1,
        userId: 1,
        title: "testTitle",
        body: "testBody"
      };

      expect(mapStateToProps(initialState).editPost).toEqual(expectedObj);
    });
    // titleHandler test
    it("should dispatch titleHandler action properly", () => {
      const dispatch = jest.fn();
      const event = {
        target: {
          value: "new title"
        }
      };
      mapDispatchToProps(dispatch).titleHandler(event);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "EDIT_TITLE",
        title: "new title"
      });
    });
    // contentHandler test
    it("should dispatch contentHandler action properly", () => {
      const dispatch = jest.fn();
      const event = {
        target: {
          value: "new body"
        }
      };
      mapDispatchToProps(dispatch).contentHandler(event);
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "EDIT_CONTENT",
        content: "new body"
      });
    });
    // editSaveHandle test
    it("should dispatch editSaveHandle action properly", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).editSaveHandle();
      expect(dispatch.mock.calls[0][0]).toEqual({
        type: "EDIT_SAVE"
      });
    });
  });
  // test if store is passed as props properly
  describe("Mock Store Test", () => {
    it("Store values were correctly passed as props", () => {
      const initialState = {
        postState: {
          edit: {
            id: 1,
            userId: 1,
            title: "TitleTest",
            body: "BobyTest"
          }
        }
      };
      let wrapper, store;
      store = mockStore(initialState);
      // Shallow render the container passing in the mock store
      wrapper = shallow(<Edit store={store} />);
      const expectedObj = {
        id: 1,
        userId: 1,
        title: "TitleTest",
        body: "BobyTest"
      };
      expect(wrapper.props().children.props.editPost).toEqual(expectedObj);
    });
  });
});
