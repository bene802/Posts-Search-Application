function getPosts(dispatch) {
  fetch("http://localhost:5000/api/posts?title=*")
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch({ type: "LOAD_DATA", output: data });
    });
}
export default { getPosts };
