var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');

var indexURL = 'web/public/index.html';

exports.handleRequest = function (req, res) {

  var statusCode = 200;

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
  
  // if (req.method === 'GET'  //   if (fs.access(req.url, function(err){ return err ? false : true })) {
  //     res.writeHead(404, http.headers);
  //     res.end();
  //   } else {
  //     fs.readFile(archive.paths.list, function(err, data) {
  //       if (err) {
  //         console.log("ERROR: in handleRequest - readFile of archive.paths.list")
  //       } else {
  //         res.write(req.url)
  //         res.end();
  //       }
  //     });
  //   }
  // }

};





