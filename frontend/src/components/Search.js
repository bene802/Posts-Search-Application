import React from "react";
import { connect } from "react-redux";
import ReactAutocomplete from "react-autocomplete";

// user typing, offer fuzzy search for auto-complete
const typingFilter = (searchText, posts) => {
  return posts.filter(post => {
    return (
      post.title.toLowerCase().indexOf(searchText.trim().toLowerCase()) >= 0
    );
  });
};

const Search = props => {
  return (
    <div className="mt-3">
      <form onSubmit={e => props.handleSearch(e, props.searchText)}>
        <ReactAutocomplete
          items={typingFilter(props.typingText, props.posts)}
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
          value={props.typingText}
          onChange={props.handleTyping}
          onSelect={value => props.selectSuggest(value)}
        />
        <button type="submit" className="ml-2 btn btn-primary">
          Search
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    typingText: state.searchState.typingText,
    searchText: state.searchState.searchText,
    posts: state.postState.posts,
    editPost: state.postState.edit
  };
};

const mapDispatchToProps = dispatch => {
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
    selectSuggest: v => {
      dispatch({ type: "SELECT_SUGGEST", searchText: v });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
