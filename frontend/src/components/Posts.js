import React from "react";
import { connect } from "react-redux";

function Posts(props) {
  return (
    <div>
      <form onSubmit={e => props.handleSubmit(e, props.searchInput)}>
        <input value={props.searchInput} onChange={props.handleSearch} />
        <button type="submit" className="ml-2 btn btn-primary">
          Search
        </button>
      </form>
      <p>{props.searchInput}</p>
      {props.posts.map(post => {
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
                onClick={() => props.handleEditShow(post)}
              >
                {" "}
                Edit
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

function mapStateToStatus(state) {
  return { searchInput: state.searchInput, posts: state.posts };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSearch: e => {
      const action = {
        type: "TYPING",
        searchText: e.target.value
      };
      dispatch(action);
    },
    handleSubmit: (e, query) => {
      e.preventDefault();
      //Apicall.getRepos(dispatch, query);
      console.log("submit");
    }
  };
}
export default connect(
  mapStateToStatus,
  mapDispatchToProps
)(Posts);
