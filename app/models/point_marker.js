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

  addMarkerShape(shape) {
    this.markerShapes[shape.shape_id] = shape;
  }

  getMarkerShape(shape_id) {
    return this.markerShapes[shape_id];
  }

  defaultState() {
    var x = this.shape.length;
    var y = this.shape[0].length;
    var state = this.createEmptyArray(x, y);
    
    for (var i = 0; i < x; i++) {
      for (var k = 0; k < y; k++) {
        state[i][k] = null;
      }
    }
    return state;
  }

  createEmptyArray(h, w) {
    var arr = new Array(h); // create an empty array of length n
    for (let i = 0; i < h; i++) {
      arr[i] = new Array(w); // make each element an array
    }
    return arr;
  }
}

module.exports.PointMarker = PointMarker;
