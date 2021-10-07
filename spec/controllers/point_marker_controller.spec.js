var PointMarkerController =
  require('../../app/controllers/point_marker_controller').PointMarkerController;
var pointMarkerSettings = require('../spec_variables').pointMarkerSettings;

describe('PointMarkerController ', function () {
  var point_marker_controller;
  beforeAll(function () {
    point_marker_controller = new PointMarkerController(pointMarkerSettings);
  });

  test('constructor works properly, succeeds', function () {
    expect(point_marker_controller).not.toEqual(null);
  });

  test('add a new player, succeeds', function () {
    var newPlayer = { user_id: 0, user_color: 'green' };
    point_marker_controller.addPlayer(newPlayer);
    expect(point_marker_controller.getPlayerSign(newPlayer)).toEqual(
      point_marker_controller.pointMarker.playerToSign[newPlayer.user_id]
    );
  });

  test('add a new marker shape, succeeds', function () {
    var newShape = {
      shape_id: 0,
      shape_name: 'name',
      shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    };
    point_marker_controller.addMarkerShape(newShape);

    expect(point_marker_controller.getMarkerShape(newShape.shape_id)).toEqual(
      newShape
    );
  });

  describe('add markers to the board ', function () {
    var user1;
    var user2;
    var markerShape1;
    var markerShape2;
    var shape;
    var controller;
    beforeAll(function () {
      user1 = { user_id: 0, user_color: 'blue' };
      user2 = { user_id: 1, user_color: 'red' };
      markerShape1 = {
        shape_id: 0,
        shape_name: 'shape 1',
        shape: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 0, 0],
        ],
      };
      markerShape2 = {
        shape_id: 1,
        shape_name: 'shape 2',
        shape: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1],
        ],
      };
      shape = [
        [0, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0, 0],
      ];
      controller = new PointMarkerController({ shape: shape });
      controller.addPlayer(user1, 0);
      controller.addPlayer(user2, 1);
      controller.addMarkerShape(markerShape1);
      controller.addMarkerShape(markerShape2);
    });

    test('add marker with default rotation on valid place on the empty board, succeeds', function () {
      expect(
        controller.placeMarker({
          user_id: 0,
          marker_id: 0,
          position: { x: 2, y: 0 },
          rotation: 0,
        })
      ).toEqual(3);

      expect(controller.getState()).toEqual([
        [null, null, 0, null, null, null],
        [null, null, 0, null, null, null],
        [null, null, 0, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ]);
    });

    test('add marker with default rotation on invalid place, fails', function () {
      expect(
        controller.placeMarker({
          user_id: 0,
          marker_id: 0,
          position: { x: 0, y: 0 },
          rotation: 0,
        })
      ).toBeFalsy();
    });

    test('add marker with default rotation on occupied place, fails', function () {
      expect(
        controller.placeMarker({
          user_id: 1,
          marker_id: 0,
          position: { x: 2, y: 0 },
          rotation: 0,
        })
      ).toBeFalsy();
    });
  });
});
