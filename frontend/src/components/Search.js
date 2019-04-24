import lunr from "lunr";

function searchTyping(props, searchText, str) {
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

  let searchStr = "";
  if (!str) {
    // search submit
    searchText.split(" ").map(c => {
      searchStr = searchStr + "+" + c + " ";
    });
    searchStr = searchStr.substring(0, searchStr.length - 1);
  } else {
    // search typing, fuzzy search to offer autosuggestion
    searchStr = searchText + "*";
  }
  console.log(searchStr);
  const searchRes = idx.search(searchStr);

  let output = [];
  searchRes.map(s => {
    output.push(mapPosts[s.ref]);
  });
  console.log(output);
  return output;
  //lunr end
}
export default { searchTyping };
