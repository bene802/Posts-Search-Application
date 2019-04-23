function getPosts(dispatch, query) {
  fetch("http://localhost:5000/api/posts?title=" + query)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      dispatch({ type: "SEARCH", output: data });
    });
}
export default { getPosts };
