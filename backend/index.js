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
  // if user input is empty, return all results.
  if (!query) {
    query = "*";
  }
  request(
    {
      url: url,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        //console.log(body); // Print the json response
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
        const searchRes = idx.query(function(q) {
          q.term(query, { fields: ["title"] });
        });
        let output = [];
        searchRes.map(s => {
          output.push(mapPosts[s.ref]);
        });
        return res.send(output);
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening port " + port));
