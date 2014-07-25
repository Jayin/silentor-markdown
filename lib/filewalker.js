var fs = require('fs');
var path = require('path');


exports.walkSync = function(start, callback) {
  var stat = fs.statSync(start);
  
  if (stat.isDirectory()) {
      var filenames = fs.readdirSync(start);

      var coll = filenames.reduce(function(acc, name) {
         
          var abspath = start + path.sep + name;
       
          if (fs.statSync(abspath).isDirectory()) {
            acc.dirs.push(name);
          } else {
            acc.names.push(name);
          }

          return acc;
      }, {
        "names": [],
        "dirs": []
      });
      callback(start, coll.dirs, coll.names);

      coll.dirs.forEach(function(d) {
        var abspath =start + path.sep + d;
        exports.walkSync(abspath, callback);
      });

  } else {
      throw new Error("path: " + start + " is not a directory");
  }
};