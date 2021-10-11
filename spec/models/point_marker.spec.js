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

  test('set sign for player', function () {
    pointMarker.setSignOfPlayer('001', 1);
    expect(pointMarker.getSignOfPlayer('001')).toEqual(1);
  });

  test('createMarkerShapeRotations, succeeds', function () {
    var markerShape1 = {
      shape_id: 0,
      shape_name: 'shape 1',
      shape: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
    };
    var markerShape2 = {
      shape_id: 1,
      shape_name: 'shape 2',
      shape: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
    };

    pointMarker.addMarkerShape(markerShape1);
    pointMarker.addMarkerShape(markerShape2);

    expect(pointMarker.getMarkerShape(markerShape1.shape_id)).toEqual({
      shape_id: 0,
      shape_name: 'shape 1',
      shape: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      shape90: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      shape180: [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      shape270: [
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
      ],
    });
  });
});
