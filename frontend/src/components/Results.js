import React from "react";
import { connect } from "react-redux";

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
  // if it's empty, search all
  if (searchText === "") return posts.map(p => ({ ...p }));
  return posts.filter(post => {
    return exactSearchHelper(
      post.title.toLowerCase(),
      searchText.trim().toLowerCase()
    );
  });
};

const Results = props => {
  return (
    <React.Fragment>
      <span className="mt-5 badge badge-pill badge-danger">Result</span>
      <div className="mt-3">
        {searchFilter(props.searchText, props.posts).map(post => {
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
                  onClick={() => props.editSelect(post)}
                >
                  {" "}
                  Edit
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    searchText: state.searchState.searchText,
    posts: state.postState.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editSelect: post => {
      dispatch({ type: "EDIT_SELECT", post: post });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
