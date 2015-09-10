var fs = require('fs');
var path = require('path');
var _ = require('underscore');

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(cb) {
  var dataArray;
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
    dataArray = data.split("\n");
    cb(dataArray);
  });
};

exports.isUrlInList = function(url, cb) {
  this.readListOfUrls(function(v) {
    cb(_.contains(v, url));
  });  
};

exports.addUrlToList = function(url, cb) {
  fs.writeFile( this.paths.list, url + '\n', 'utf8', function(err) { cb() });
};

exports.isUrlArchived = function(url, cb) {
  var fullPath = this.paths.archivedSites + '/' + url;
  fs.readdir(this.paths.archivedSites, function(err, data){
    cb(_.contains(data, fullPath));
  }), fullPath };

exports.downloadUrls = function(array) {
  // for (var i = 0; i < array.length; i++){
  //   console.log(array[i])
  //   if(!isUrlArchived(array[i], function(v){return v})){
  //     var file = fs.openSync(this.paths.archivedSites + "/" + array[i], "w");
  //     fs.closeSync(file);
  //   }
  // }

};
