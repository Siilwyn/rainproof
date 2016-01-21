'use strict';

(function () {
  var x, xAxis, y, yAxis, rainGraphElement, width, height, margin;

  var rainGraph = {
    // Load the data from a JSON file and
    // format data by setting the correct time format
    loadData: function (dataUrl, callback) {
      var formatDate = d3.time.format('%Y-%m');
      var key;

      d3.json(dataUrl, function (err, data) {
        if (err) throw err;

        data = d3.entries(data);

        // ES6: let key in data
        for (key in data) {
          data[key].key = formatDate.parse(data[key].key);
        }

        rainGraph.data = data;
        callback();
      });
    },

    setupContainer: function () {
      margin = {
        top: 20,
        right: 50,
        bottom: 75,
        left: 100
      };

      width = 1500 - margin.left - margin.right;
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
      var lineData;

      x.domain(d3.extent(data, function (d) {
        return d.key;
      }));

      y.domain([0, d3.max(data, function (d) {
        return d.value;
      })]);

      lineData = d3.svg.line()
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

      rainGraphElement.append('text')
        .attr('x', width / 2)
        .attr('y',  height + margin.bottom / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text('Datum');

      rainGraphElement.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

      rainGraphElement.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 0 - height / 2)
        .attr('y',  0 - margin.left)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text('Regen in mm');

      rainGraphElement.append('path')
      .datum(data)
        .attr('class', 'line')
        .attr('d', lineData);
    },

    bindToDom: function () {
      var yearControl = selectAttr('data-rainfall-control');

      yearControl.addEventListener('click', function () {
        var selectedYear = this.value;
        selectAttr('data-rainfall-control-value').value = selectedYear;

        var startDate = new Date(selectedYear, 1, 1);
        var endDate = new Date(Number(selectedYear) + 1, 1, 1);

        rainGraph.loadData('/assets/json-data/regenval.json', function () {
          var data = rainGraph.data.filter(function (value) {
            return value.key > startDate && value.key < endDate;
          });

          rainGraph.updateLine(data);
        });
      });
    },

    initFirstYear: function () {
      var startDate = new Date(2009, 1, 1);
      var endDate = new Date(2010, 1, 1);

      rainGraph.loadData('/assets/json-data/regenval.json', function () {
        var data = rainGraph.data.filter(function (value) {
          return value.key > startDate && value.key < endDate;
        });

        rainGraph.fillInData(data);
      });
    },

    updateLine: function (data) {
      var lineData;

      x.domain(d3.extent(data, function (d) {
        return d.key;
      }));

      rainGraphElement.select('.x.axis')
        .call(xAxis);

      x.domain(d3.extent(data, function (d) {
        return d.key;
      }));

      y.domain([0, d3.max(data, function (d) {
        return d.value;
      })]);

      lineData = d3.svg.line()
        .x(function (d) {
          return x(d.key);
        })
        .y(function (d) {
          return y(d.value);
        })
        .interpolate('basis');

      rainGraphElement.select('.line')
      .datum(data)
        .attr('d', lineData);
    }
  };

  rainGraph.setupContainer();
  rainGraph.bindToDom();
  rainGraph.initFirstYear();

})();
