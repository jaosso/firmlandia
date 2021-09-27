class PointMarker {
  constructor(opt) {
    opt = Object.assign(
      {
        shape: null,
        state: null,
        points: null,
        playerToSign: null,
      },
      opt
    );

    this.shape = opt.shape;
    this.state = opt.state;
    this.points = opt.points;
    this.playerToSign = opt.playerToSign;
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
}

module.exports.PointMarker = PointMarker;
