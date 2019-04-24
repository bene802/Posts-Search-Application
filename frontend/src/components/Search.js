import lunr from "lunr";

function searchTyping(props, searchText) {
  //console.log(props.posts);
  if (!searchText) {
    searchText = "*";
  }
  //lunr
  const mapPosts = props.posts.reduce(function(map, obj) {
    map[obj.id] = obj;
    return map;
  }, {}); // map <post.id, post>

  var idx = lunr(function() {
    this.field("title");
    this.ref("id");
    props.posts.forEach(function(p) {
      this.add(p);
    }, this);
  });

  const searchRes = idx.query(function(q) {
    q.term(String(searchText), { fields: ["title"] });
  });
  let output = [];
  searchRes.map(s => {
    output.push(mapPosts[s.ref]);
  });
  console.log(output);
  return output;
  //lunr end
}
export default { searchTyping };
