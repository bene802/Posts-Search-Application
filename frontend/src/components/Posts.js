import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "./Api";
import Edit from "./Edit";
import Results from "./Results";
import Search from "./Search";

class Posts extends Component {
  componentDidMount() {
    this.props.initial();
  }

  render() {
    return (
      <div>
        <Edit />
        <Search />
        <Results />
      </div>
    );
  }
}

function mapStateToStatus(state) {
  return { state };
}

export function mapDispatchToProps(dispatch) {
  return {
    initial: () => {
      Api.getPosts(dispatch);
    }
  };
}
export default connect(
  mapStateToStatus,
  mapDispatchToProps
)(Posts);
