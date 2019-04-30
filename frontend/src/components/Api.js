function getPosts(dispatch) {
  fetch("http://localhost:5000/api/posts?title=*")
    .then(res => {
      return res.json();
    })
    .then(data => {
      const output = data.sort((a, b) => {
        return a.title < b.title ? -1 : 1;
      });
      dispatch({ type: "LOAD_DATA", output: output });
    });
}
export default { getPosts };
