import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "./Api";
import ReactAutocomplete from "react-autocomplete";

class Posts extends Component {
  componentDidMount() {
    this.props.initial();
  }

  render() {
    return (
      <div>
        <div className="border border-success">
          <span className="badge badge-pill badge-danger m-2">Edit</span>
          <button
            onClick={() => this.props.editSaveHandle()}
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
                  value={this.props.editPost.title}
                  onChange={e => this.props.titleHandler(e)}
                />
              </p>
              <p>
                <span className="modal-lable">Content:</span>
                <input
                  type="text"
                  className="form-control"
                  value={this.props.editPost.body}
                  onChange={e => this.props.contentHandler(e)}
                />
              </p>
            </form>
          </div>
        </div>
        <div className="mt-3">
          <form
            onSubmit={e => this.props.handleSearch(e, this.props.searchInput)}
          >
            <ReactAutocomplete
              items={this.props.searchList}
              getItemValue={item => item.title}
              renderItem={(item, highlighted) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: highlighted ? "#eee" : "transparent"
                  }}
                >
                  {item.title}
                </div>
              )}
              value={this.props.searchInput}
              onChange={this.props.handleTyping}
              onSelect={value => this.props.selectValue(value)}
            />
            <button type="submit" className="ml-2 btn btn-primary">
              Search
            </button>
          </form>
        </div>

        <span className="mt-5 badge badge-pill badge-danger">Result</span>
        <div className="mt-3">
          {this.props.searchRes.map(post => {
            return (
              <div
                key={post.id}
                className="card flex-md-row mb-4 box-shadow h-md-250"
              >
                <div className="card-body d-flex flex-column align-items-start">
                  <div className="mb-0">
                    <div className="text-dark " href="#">
                      <h3>{post.title}</h3>
                    </div>
                  </div>
                  <div className="mb-1 text-muted">User: {post.userId}</div>
                  <p className="card-text mb-auto">{post.body}</p>
                </div>
                <span className="card-right flex-auto d-none d-md-block mr-2 mt-3">
                  <button
                    className="fas fa-edit btn btn-primary mr-2 mb-2"
                    onClick={() => this.props.editSelect(post)}
                  >
                    {" "}
                    Edit
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToStatus(state) {
  return {
    searchInput: state.searchInput,
    posts: state.posts,
    searchList: state.searchList,
    searchRes: state.searchRes,
    editPost: state.editPost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleTyping: e => {
      const action = {
        type: "TYPING",
        searchText: e.target.value
      };
      dispatch(action);
    },
    handleSearch: (e, v) => {
      e.preventDefault();
      const action = {
        type: "SEARCH",
        searchText: v
      };
      dispatch(action);
    },
    initial: () => {
      Api.getPosts(dispatch);
    },
    selectValue: v => {
      dispatch({ type: "SELECTVALUE", select: v });
    },
    editSelect: post => {
      dispatch({ type: "EDITSELECT", post: post });
    },
    titleHandler: e => {
      const action = {
        type: "EDITTITLE",
        title: e.target.value
      };
      dispatch(action);
    },
    contentHandler: e => {
      const action = {
        type: "EDITCONTENT",
        content: e.target.value
      };
      dispatch(action);
    },
    editSaveHandle: () => {
      dispatch({ type: "EDITSAVE" });
    }
  };
}
export default connect(
  mapStateToStatus,
  mapDispatchToProps
)(Posts);
