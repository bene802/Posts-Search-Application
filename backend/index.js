const express = require("express");
const app = express();
const request = require("request");

app.use(express.json());

const posts = [
  { id: 1, name: "post 1" },
  { id: 2, name: "post 2" },
  { id: 3, name: "post 3" }
];

const url = "http://jsonplaceholder.typicode.com/posts";
app.get("/api", (req, res) => {
  request(
    {
      url: url,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body); // Print the json response
        res.send(body);
        return;
      }
    }
  );
  return;
});

app.get("/api/posts/:id", (req, res) => {
  const post = post.find(c => c.id === parseInt(req.params.id));
  if (!post) res.status(404).send("id not find"); // 404 not found
  res.send(post);
});

app.put("/api/posts/:id", (req, res) => {
  // look up the post, if not exist, return 404 not found
  // validate, if invalid, return 400, bad request
  // update the post.
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening port " + port));
