var expect = require("chai").expect;
var request = require("request");

it("valid query test", function(done) {
  request("http://localhost:5000/api/posts?title=quaerat", function(
    error,
    response,
    body
  ) {
    expect(response.statusCode).to.equal(200);
    expect(typeof body).to.equal("string");
    done();
  });
});

it("request bad format", function(done) {
  request("http://localhost:5000/api/posts?=", function(error, response, body) {
    expect(response.statusCode).to.equal(400);
    done();
  });
});

it("invalid query request", function(done) {
  request("http://localhost:5000/api/posts?body=", function(
    error,
    response,
    body
  ) {
    expect(response.statusCode).to.equal(400);
    done();
  });
});

it("request wrong path", function(done) {
  request("http://localhost:5000/apis/posts", function(error, response, body) {
    expect(response.statusCode).to.equal(404);
    done();
  });
});
