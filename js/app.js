//Problem: We need a simple way to look at a users badge counta nd javascript points from a Webbrowser.
//Solution: Use Node.js to perform the profile look ups and serve our template via HTTP

var router = require("./router.js")

// Create a web server

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

http.createServer((req, res) => {
  router.home(req, res);
  router.user(req, res);
}).listen(port);
console.log(`Server running at http://${hostname}:${port}/`);

//Function that handles the reading of files and merge in values
    //read from file and get a string
        //merge values in to strings