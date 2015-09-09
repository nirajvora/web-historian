var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');

var indexURL = 'web/public/index.html';

exports.handleRequest = function (req, res) {

  var statusCode = 200;

  fs.readFile(indexURL, function(err, data){
    if (err) {
      console.log("ERROR: in handleRequest - readFile of indexURL")
    } else {
      res.writeHead(statusCode, http.headers);
      res.write(data);
      res.end();
    }
  });
  // console.log(request)
    // console.log('test1')
    console.log(req);
  if (req.method === 'GET' && req.method !== '/'){
    // console.log('test2')
    fs.readFile(archive.paths.list, function(err, data) {
      if (err) {
        console.log("ERROR: in handleRequest - readFile of indexURL")
      } else {
        // console.log('test3')
        res.end(data);
      }
    });
  }
};




