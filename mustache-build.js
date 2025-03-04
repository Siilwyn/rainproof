'use strict';

var fs = require('fs');
var path = require('path');

var mustache = require('mustache');
var glob = require('glob');

var partials = {};

// Fills in the partials variable
var handlePartials = function () {
  glob('src/partials/**/*.mustache', function (err, files) {
    if (err) throw err;

    files.forEach(function (file, index) {
      var partialName = path.basename(file, '.mustache');
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw err;

        partials[partialName] = data;

        // Processed last partial now call the views processing
        if (files[files.length - 1] === file) {
          handleViews();
        }
      });
    });
  });
};
handlePartials();

// Write html files from mustache views
var handleViews = function () {
  glob('src/views/*.mustache', function (err, files) {
    if (err) throw err;

    files.forEach(function (file, index) {
      fs.readFile(file, function (err, data) {
        if (err) throw err;

        var fileName = path.basename(file, '.mustache');
        var outputPath = path.join('dist', fileName) + '.html';
        var jsonPath = file.slice(0,-8) + 'json';
        var parsedData = data.toString();

        fs.readFile(jsonPath, function (err, jsonData) {
          jsonData = jsonData || "{}";

          var parsedJsonData = JSON.parse(jsonData);

          fs.writeFile(outputPath, mustache.render(parsedData, parsedJsonData, partials), function (err) {
            if (err) throw err;
          });
        });

      });
    });
  });
};
