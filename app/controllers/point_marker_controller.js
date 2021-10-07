const { PointMarker } = require('../models/point_marker');
const { matrix, pi, rotationMatrix } = require('mathjs');

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
    var markerShape = this.getMarkerShape(opt.marker_id).shape;
    var shape = this.pointMarker.getShape();
    var state = this.pointMarker.getState();
    var x_offset = opt.position.x;
    var y_offset = opt.position.y;

    var markerShape90 = this.rotate(markerShape);
    var markerShape180 = this.rotate(markerShape90);
    var markerShape270 = this.rotate(markerShape180);

    console.log(markerShape);
    console.log(markerShape90);
    console.log(markerShape180);
    console.log(markerShape270);

    // TODO: check if all point fields are free and part of the shape

    for (let y in markerShape) {
      for (let x in markerShape[y]) {
        if (markerShape[y][x] == 1) {
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
        if (markerShape[y][x] == 1) {
          // replace state x y with sign if marker x y is 1
          if (markerShape[y][x] == 1) {
            state[y_offset + parseInt(y)][x_offset + parseInt(x)] = sign;
          }
        }
      }
    }

    // TODO: calc the points for the player
    var points = 0;
    for (let y in state) {
      for (let x in state[y]) {
        if (state[y][x] == sign) points++;
      }
    }
    this.setPointsOfPlayer({ user_id: opt.user_id }, points);
    return points;
  }

  rotate(mat) {
    // 1. transpose mat
    var rot = this.pointMarker.createEmptyArray(mat.length, mat[0].length);

    for (let col in mat) {
      for (let row in mat) {
        rot[col][row] = mat[row][col];
      }
    }

    // 2. reverse all cols
    for (let col in rot) {
      rot[col] = rot[col].reverse();
    }
    
    return rot;
  }
}

module.exports.PointMarkerController = PointMarkerController;
