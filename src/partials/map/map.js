'use strict';

// Based on http://bost.ocks.org/mike/leaflet/

if (selectAttr('data-map')) {
  var prevYear = 2009;

  var yearControl = selectAttr('data-year-control');
  yearControl.addEventListener('click', function () {
    var year = this.value;
    selectAttr('data-year-control-value').value = year;

    selectAttr('data-layer-year="' + prevYear + '"').classList.add('hide');
    selectAttr('data-layer-year="' + year + '"').classList.remove('hide');

    prevYear = year;
  });

  var landuseCategories = {
    onverhard: [40, 400, 411, 412, 42, 420, 431, 51, 510, 60, 600, 61, 610],
    semiVerhard: [101, 32, 320, 33, 330, 34, 340, 35, 350, 43, 430, 44, 440, 50, 500],
    verhard: [102, 103, 11, 110, 111, 112, 12, 120, 20, 200, 21, 210, 221, 222, 23, 230, 241, 242, 30, 300, 31, 310, 413],
    water: [62, 620, 622, 625, 625, 73, 730, 74, 740, 75, 750, 751, 752, 753, 78, 780, 781, 782, 83, 830, 70, 700]
  };

  // Convert geometry to Leaflet's geometry
  var offset = {
    x: -5,
    y: 40
  };

  var projectPoint = function (x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x + offset.x, point.y + offset.y);
  };

  // Find key name based on the array content
  var findKey = function (object, searchValue) {
    for (var key in object) {
      if (~object[key].indexOf(searchValue)) {
        return key;
      }
    }
  };

  // Setup map and basemap tiles
  var map = L.mapbox.map(selectAttr('data-map'), 'mapbox.light', {
    center: [52.36663, 4.90231],
    zoom: 13,
    scrollWheelZoom: false,
    accessToken: 'pk.eyJ1IjoiY2hyaXN0aWFuY29uaWpuIiwiYSI6ImNpamU2c3g3cDAwYTl1MWpidDd5OHNrNHcifQ.W8Nihel-B43Eya_CzTgSCA'
  });

  var addDataLayer = function (fileName, year) {
    var svgContainer = d3.select(map.getPanes().overlayPane)
    .append('svg');

    var dataLayer = svgContainer.append('g')
    .attr('class', 'leaflet-data-layer leaflet-zoom-hide hide')
    .attr('data-layer-year', year);

    d3.json('/assets/json-data/' + fileName, function (error, collection) {
      if (error) throw error;

      var mapProjection = d3.geo.transform({ point: projectPoint });
      // Generate path data according to the map projection
      var path = d3.geo.path().projection(mapProjection);

      // Create an empty path element for each feature
      var feature = dataLayer.selectAll('path')
        .data(collection.features)
        .enter()
        .append('path')
        .attr('class', function (d) {
          return findKey(landuseCategories, d.properties.amscode);
        })
        .attr('data-landusage-id', function (d) {
          return d.properties.amscode;
        });

      map.on('viewreset', resizeSvgContainer);
      resizeSvgContainer();

      // Reposition the SVG to cover the features
      function resizeSvgContainer () {
        var bounds = path.bounds(collection);
        var leftTopBounds = bounds[0];
        var rightBottomBounds = bounds[1];

        // Set the correct dimensions and position
        svgContainer
          .attr('width', rightBottomBounds[0] - leftTopBounds[0])
          .attr('height', rightBottomBounds[1] - leftTopBounds[1])
          .style('left', leftTopBounds[0] + 'px')
          .style('top', leftTopBounds[1] + 'px');

        dataLayer.attr('transform', 'translate(' +
          -leftTopBounds[0] + ',' + -leftTopBounds[1]
          + ')');

        // Fill path with path data
        feature.attr('d', path);
      }
    });
  };

  for (var year = 2009; year < 2015; year += 1) {
    addDataLayer('grondgebruik-' + year + '.geojson', year);
  }
}
