var PointMarker = require('../../app/models/point_marker').PointMarker;
var pointMarkerSettings = require('../spec_variables').pointMarkerSettings;

describe('PointMarker data object ', function () {
  var pointMarker;
  beforeAll(function () {
    var opt = {
      shape: pointMarkerSettings.shape,
      state: pointMarkerSettings.state,
      points: pointMarkerSettings.points,
      playerToSign: pointMarkerSettings.playerToSign,
    };
    pointMarker = new PointMarker(opt);
  });

  test('constructor creates object properly, succeeds', function () {
    expect(pointMarker).not.toEqual(null);
  });

  test('getters work properly, succeeds', function () {
    expect(pointMarker.getShape()).toEqual(pointMarkerSettings.shape);
    expect(pointMarker.getState()).toEqual(pointMarkerSettings.state);
    expect(pointMarker.getPoints()).toEqual(pointMarkerSettings.points);
    expect(pointMarker.getPlayerToSign()).toEqual(
      pointMarkerSettings.playerToSign
    );
  });

  test('get sign of player, succeeds', function () {
    expect(pointMarker.getSignOfPlayer('001')).toEqual(
      pointMarkerSettings.playerToSign['001']
    );
  });

  test('set sign for player', function() {
    pointMarker.setSignOfPlayer('001', 1);
    expect(pointMarker.getSignOfPlayer('001')).toEqual(1);
  });
});
