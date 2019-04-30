import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "./Api";
import ReactAutocomplete from "react-autocomplete";

const exactSearchHelper = (text, searchText) => {
  const l = text.indexOf(searchText);
  if (l < 0) return false;
  const r = l + searchText.length - 1;
  // if there are still characters on the left or right side, return false
  if (l - 1 >= 0 && !/\s/.test(text[l - 1])) return false;
  if (r + 1 < text.length && !/\s/.test(text[r + 1])) return false;
  return true;
};

// user click search button, offer exact search
const searchFilter = (searchText, posts) => {
  // search all
  if (searchText === "") return posts.map(p => ({ ...p }));
  return posts.filter(post => {
    return exactSearchHelper(
      post.title.toLowerCase(),
      searchText.trim().toLowerCase()
    );
  });
};

// user typing, offer fuzzy search for auto-complete
const typingFilter = (searchText, posts) => {
  return posts.filter(post => {
    return (
      post.title.toLowerCase().indexOf(searchText.trim().toLowerCase()) >= 0
    );
  });
};

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
            onSubmit={e => this.props.handleSearch(e, this.props.searchText)}
          >
            <ReactAutocomplete
              items={typingFilter(this.props.typingText, this.props.posts)}
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
              value={this.props.typingText}
              onChange={this.props.handleTyping}
              onSelect={value => this.props.selectSuggest(value)}
            />
            <button type="submit" className="ml-2 btn btn-primary">
              Search
            </button>
          </form>
        </div>

        <span className="mt-5 badge badge-pill badge-danger">Result</span>
        <div className="mt-3">
          {searchFilter(this.props.searchText, this.props.posts).map(post => {
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
    typingText: state.searchState.typingText,
    searchText: state.searchState.searchText,
    posts: state.postState.posts,
    editPost: state.postState.edit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleTyping: e => {
      const action = {
        type: "SEARCH_TYPING",
        typingText: e.target.value
      };
      dispatch(action);
    },
    handleSearch: (e, v) => {
      e.preventDefault();
      const action = {
        type: "SEARCH_SUBMIT",
        searchText: v
      };
      dispatch(action);
    },
    initial: () => {
      Api.getPosts(dispatch);
    },
    selectSuggest: v => {
      dispatch({ type: "SELECT_SUGGEST", searchText: v });
    },
    editSelect: post => {
      dispatch({ type: "EDIT_SELECT", post: post });
    },
    titleHandler: e => {
      const action = {
        type: "EDIT_TITLE",
        title: e.target.value
      };
      dispatch(action);
    },
    contentHandler: e => {
      const action = {
        type: "EDIT_CONTENT",
        content: e.target.value
      };
      dispatch(action);
    },
    editSaveHandle: () => {
      dispatch({ type: "EDIT_SAVE" });
    }
  };
}
export default connect(
  mapStateToStatus,
  mapDispatchToProps
)(Posts);
