'use strict';

var x, xAxis, y, yAxis, rainGraphElement, height;

var rainGraph = {
  loadData: function (dataUrl, callback) {
    d3.json(dataUrl, function (err, data) {
      if (err) throw err;

      var formatDate = d3.time.format('%Y-%m');

      data = d3.entries(data);

      for (var key in data) {
        data[key].key = formatDate.parse(data[key].key);
      }

      rainGraph.data = data;
      callback();
    });
  },
  setupContainer: function () {
    var margin = {
      top: 20,
      right: 50,
      bottom: 30,
      left: 40
    };

    var width = 1000 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

    x = d3.time.scale()
      .range([0, width]);

    y = d3.scale.linear()
      .range([height, 0]);

    xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    rainGraphElement = d3.select('[data-rainfall-linegraph]')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  },
  fillInData: function (data) {
    x.domain(d3.extent(data, function (d) {
      return d.key;
    }));

    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    var line = d3.svg.line()
      .x(function (d) {
        return x(d.key);
      })
      .y(function (d) {
        return y(d.value);
      })
      .interpolate('basis');

    rainGraphElement.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    rainGraphElement.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    rainGraphElement.append('path')
    .datum(data)
      .attr('class', 'line')
      .attr('d', line);
  }
};

rainGraph.setupContainer();

var startDate = new Date(2009, 1, 1);
var endDate = new Date(2010, 1, 1);

rainGraph.loadData('/assets/json-data/regenval.json', function () {
  var data = rainGraph.data.filter(function (value) {
    return value.key > startDate && value.key < endDate;
  });

  rainGraph.fillInData(data);
});
