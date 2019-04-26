const express = require("express");
const app = express();
const request = require("request");
const lunr = require("lunr");

app.use(express.json());

const url = "http://jsonplaceholder.typicode.com/posts";

var posts = [];

app.get("/api/posts", (req, res) => {
  // error handle, no "title" attribute in query string
  if (!("title" in req.query)) {
    return res.status(400).send("Bad Request. No title in query string.");
  }
  let query = String(req.query.title);
  let searchStr = "";
  // if user input is empty, return all results.
  if (!query) {
    searchStr = "*";
  } else {
    query.split(" ").map(c => {
      searchStr = searchStr + "+" + c + " ";
    });
    searchStr = searchStr.substring(0, searchStr.length - 1);
  }
  request(
    {
      url: url,
      json: true
    },
    function(error, response, body) {
      if (error) {
        return res.sendStatus(500).json(error);
      }
      if (!error && response.statusCode === 200) {
        posts = body.map(a => Object.assign({}, a));
        const mapPosts = body.reduce(function(map, obj) {
          map[obj.id] = obj;
          return map;
        }, {}); // map <post.id, post>
        // use lunr to search text in "title"
        var idx = lunr(function() {
          this.field("title");
          this.ref("id");
          posts.map(post => {
            this.add(Object.assign({}, post));
          });
        });
        const searchRes = idx.search(searchStr);
        let output = [];
        searchRes.map(s => {
          output.push(mapPosts[s.ref]);
        });
        res.header("Access-Control-Allow-Origin", "*");
        return res.send(output);
      } else {
        return res.sendStatus(response.statusCode);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening port " + port));
