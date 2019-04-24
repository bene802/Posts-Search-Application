function getPosts(dispatch) {
  fetch("http://localhost:5000/api/posts?title=*")
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch({ type: "START", output: data });
    });
}
export default { getPosts };
