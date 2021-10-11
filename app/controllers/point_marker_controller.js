const { PointMarker } = require('../models/point_marker');

class PointMarkerController {
  constructor(opt) {
    opt = Object.assign(
      {
        shape: [],
        state: null,
        points: {},
        playerToSign: {},
        markerShapes: {},
      },
      opt
    );

    this.pointMarker = new PointMarker(opt);
  }

  addPlayer(player, sign) {
    this.pointMarker.setSignOfPlayer(player.user_id, sign);
    this.pointMarker.setPointsOfPlayer(player.user_id, 0);
  }

  setPointsOfPlayer(player, points) {
    this.pointMarker.setPointsOfPlayer(player.user_id, points);
  }

  getPlayerSign(player) {
    return this.pointMarker.getSignOfPlayer(player.user_id);
  }

  getState() {
    return this.pointMarker.getState();
  }

  getShape() {
    return this.pointMarker.getShape();
  }

  addMarkerShape(shape) {
    this.pointMarker.addMarkerShape(shape);
  }

  getMarkerShape(shape_id) {
    return this.pointMarker.getMarkerShape(shape_id);
  }

  placeMarker(opt) {
    var sign = this.getPlayerSign({ user_id: opt.user_id });
    var markerShape;
    if (opt.rotation === 0) {
      markerShape = this.getMarkerShape(opt.marker_id).shape;
    } else if (opt.rotation === 1) {
      markerShape = this.getMarkerShape(opt.marker_id).shape90;
    } else if (opt.rotation === 2) {
      markerShape = this.getMarkerShape(opt.marker_id).shape180;
    } else if (opt.rotation === 3) {
      markerShape = this.getMarkerShape(opt.marker_id).shape270;
    }
    var shape = this.pointMarker.getShape();
    var state = this.pointMarker.getState();
    var x_offset = opt.position.x;
    var y_offset = opt.position.y;

    // TODO: check if all point fields are free and part of the shape

    for (let y in markerShape) {
      for (let x in markerShape[y]) {
        if (markerShape[y][x] === 1) {
          // check if shape is out of boundary
          if (shape[y_offset + parseInt(y)][x_offset + parseInt(x)] == 0) {
            console.log('out of boundary');
            return false;
          }
          // check if tile is already occupied
          if (state[y_offset + parseInt(y)][x_offset + parseInt(x)] != null) {
            console.log('already occupied');
            return false;
          }
        }
      }
    }

    // TODO: if so, replace the corresponding fields in the state mat
    for (let y in markerShape) {
      for (let x in markerShape[y]) {
        if (markerShape[y][x] === 1) {
          // replace state x y with sign if marker x y is 1
          if (markerShape[y][x] === 1) {
            state[y_offset + parseInt(y)][x_offset + parseInt(x)] = sign;
          }
        }
      }
    }

    // check if fields are surrounded
    for (let y in state) {
      for (let x in state) {
        // check if field is surroundable
        if (y > 0 && x > 0 && y < state.length - 1 && x < state[y].length - 1) {
          let cnt = 0;
          for (let m = -1; m < 2; m++) {
            for (let n = -1; n < 2; n++) {
              let ym = parseInt(y) + parseInt(m);
              let xn = parseInt(x) + parseInt(n);
              if (state[ym][xn] === sign) {
                cnt++;
              }
            }
          }
          if (cnt === 8) {
            state[y][x] = sign;
            console.log('surrounded');
          }
        }
      }
    }

    // TODO: calc the points for the player
    var points = 0;
    for (let y in state) {
      for (let x in state[y]) {
        if (state[y][x] === sign) points++;
      }
    }
    this.setPointsOfPlayer({ user_id: opt.user_id }, points);
    return points;
  }
}

module.exports.PointMarkerController = PointMarkerController;
