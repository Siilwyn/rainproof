'use strict';

var fs = require('fs');
var path = require('path');

var mustache = require('mustache');
var walkdir = require('walkdir');
var glob = require('glob');

var partials = {};

var handlePartials = function () {
  glob('src/partials/**/*.mustache', function (err, files) {
    if (err) throw err;

    files.forEach(function (element, index) {
      partials[path.basename(element, '.mustache')] = fs.readFileSync(element, 'utf8');
    });
  });
};
handlePartials();

var handleViews = function () {
  walkdir('./src/views', function (filePath) {
    fs.readFile(filePath, function (err, data) {
      if (err) throw err;
      var fileName = path.basename(filePath, '.mustache');

      fs.writeFile(path.join('dist', fileName) + '.html', mustache.render(data.toString(), {}, partials), function (err) {
        if (err) throw err;
      });
    });
  });
};
handleViews();
