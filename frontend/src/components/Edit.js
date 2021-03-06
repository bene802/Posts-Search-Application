import React from "react";
import { connect } from "react-redux";

export const Edit = props => {
  return (
    <div className="border border-success">
      <span className="badge badge-pill badge-danger m-2">Edit</span>
      <button
        onClick={() => props.editSaveHandle()}
        className="float-right mt-2 mr-2 btn btn-primary"
      >
        Save
      </button>
      <div className="mt-2 mb-2 ml-2 mr-2">
        <form>
          <p>
            <span className="modal-lable">Title:</span>
            <input
              type="text"
              className="form-control"
              value={props.editPost.title}
              onChange={e => props.titleHandler(e)}
            />
          </p>
          <p>
            <span className="modal-lable">Content:</span>
            <input
              type="text"
              className="form-control"
              value={props.editPost.body}
              onChange={e => props.contentHandler(e)}
            />
          </p>
        </form>
      </div>
    </div>
  );
};

export const mapStateToProps = state => {
  return {
    editPost: state.postState.edit
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    titleHandler: e => {
      dispatch({ type: "EDIT_TITLE", title: e.target.value });
    },
    contentHandler: e => {
      dispatch({ type: "EDIT_CONTENT", content: e.target.value });
    },
    editSaveHandle: () => {
      dispatch({ type: "EDIT_SAVE" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
