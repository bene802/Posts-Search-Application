# Posts-Search-Application

A web application for posts search and edit.

Demo video: https://www.youtube.com/watch?v=-2Ph4cKy6ww

## Frontend (React, Redux, Bootstrap)
### Search
* Provide ability for user to search posts by title.
* Incorporate auto-complete to predict what the user will type next for the title.
* Fuzzy search for auto-complete suggestion. Exact search for user search.
* Lunr.js library for searching. React-autocomplete library for auto-complete

### Edit
* Provide ability for user to eidt the post.
* Edited data store in Redux local store.

## Backend (Node.js, Express)
* Provide RESTful API services.
* Data retrieves from http://jsonplaceholder.typicode.com/posts
* Request error handling.
* CORS allow.

## Unit Test

### Frontend Test
* jest, enzyme
* Action Test
* Component Test
* Reducer Test

### Backend Test

* Testing API services using Mocha, Chai library.

## Installing
```
git clone git@github.com:bene802/Posts-Search-Application.git
npm install
```
Backend: (listening port 5000)
```
cd backend
nodemon index.js
```

Frontend (http://localhost:3000/)
```
cd frontend
npm start
```

Test
```
cd frontend
npm test
```
```
cd backend
npm test
```

## Future Works
* Frontend use Modal for editing post.
* Frontend Pagination.
* Build database.
* User sign in. User can only edit his/her own posts.
