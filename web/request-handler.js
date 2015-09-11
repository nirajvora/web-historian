var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');
var querystring = require('querystring');

var indexURL = 'web/public/index.html';

exports.handleRequest = function (req, res) {

  var statusCode = 200;
  var url = req.url;
  if (req.method === 'POST') {
    var fullBody = '';
    req.on('data', function(chunk) {
      fullBody += chunk.toString();
    });
    req.on('end', function() {
      var decodedBody = querystring.parse(fullBody)
      url = decodedBody.url;

      archive.isUrlInList(url, function(bool) {
        if (!bool) {
          archive.addUrlToList(url, function() {
            res.writeHead(302, {Location: url});
            res.end();
          });
        }
      });
    });
  } else if (req.method === 'GET' && req.url !== '/') {
    fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
      if (err) {
        res.writeHead(404, http.headers);
        res.end();
      } else {
        var temp = data.toString();
        res.writeHead(200, http.headers);
        res.end(temp);
      }
    });
  } else if (req.url === '/' && req.method === 'GET') {
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
};
