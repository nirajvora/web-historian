var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');

var indexURL = 'web/public/index.html';

exports.handleRequest = function (req, res) {

  var statusCode = 200;
  var url = req.url;


  if (req.url === '/') {
    fs.readFile(indexURL, function(err, data){
      if (err) {
        console.log("ERROR: in handleRequest - readFile of indexURL")
      } else {
        res.writeHead(statusCode, http.headers);
        res.write(data);
        res.end();
      }
    });
  }

  if (req.method === 'POST') {
    if (!archive.isUrlInList(url, function(v) {return v})) {
      archive.addUrlToList(url, function() {});
      res.writeHead(302, http.headers);
      res.end();
    }
  }

  if ( req.url !== '/' && !archive.isUrlArchived(url, function(v) {return v})) {
    res.writeHead(404, http.headers);
    res.end();
  }

};





