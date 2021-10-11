class PointMarker {
  constructor(opt) {
    opt = Object.assign(
      {
        shape: [],
        state: [],
        points: {},
        playerToSign: {},
        markerShapes: {},
      },
      opt
    );

    this.shape = opt.shape; // shape of the board where the markers go to
    this.markerShapes = opt.markerShapes;
    this.state = opt.state || this.defaultState(); // which field of the board is occupied by which player
    this.points = opt.points; // current points of the players
    this.playerToSign = opt.playerToSign; // character representation of the players in the state
  }

  getShape() {
    return this.shape;
  }

  getState() {
    return this.state;
  }

  getPoints() {
    return this.points;
  }

  getPlayerToSign() {
    return this.playerToSign;
  }

  getSignOfPlayer(player_id) {
    return this.playerToSign[player_id];
  }

  setSignOfPlayer(player_id, sign) {
    this.playerToSign[player_id] = sign;
  }

  setPointsOfPlayer(player_id, points) {
    this.points[player_id] = points;
  }

  addMarkerShape(markerShape) {
    this.markerShapes[markerShape.shape_id] =
      this.createMarkerShapeRotations(markerShape);
  }

  getMarkerShape(shape_id) {
    return this.markerShapes[shape_id];
  }

  createMarkerShapeRotations(markerShape) {
    let shape0 = markerShape.shape;
    let shape90 = this.rotate(shape0);
    let shape180 = this.rotate(shape90);
    let shape270 = this.rotate(shape180);

    markerShape.shape90 = shape90;
    markerShape.shape180 = shape180;
    markerShape.shape270 = shape270;

    return markerShape;
  }

  defaultState() {
    var x = this.shape.length;
    var y = this.shape[0].length;
    var state = this.createEmpty2DimArray(x, y);

    for (var i = 0; i < x; i++) {
      for (var k = 0; k < y; k++) {
        state[i][k] = null;
      }
    }
    return state;
  }

  createEmpty2DimArray(h, w) {
    var arr = new Array(h); // create an empty array of length n
    for (let i = 0; i < h; i++) {
      arr[i] = new Array(w); // make each element an array
    }
    return arr;
  }

  rotate(mat) {
    // 1. transpose mat
    var rot = this.createEmpty2DimArray(mat.length, mat[0].length);

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

module.exports.PointMarker = PointMarker;
