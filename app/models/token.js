class Token {
  constructor(player_id, token_color, position) {
    this.player_id = player_id;
    this.token_color = token_color;
    this.position = position;
  }

  getPlayerId() {
    return this.player_id;
  }

  getTokenColor() {
    return this.token_color;
  }

  getPosition() {
    return this.position;
  }

  setTokenColor(token_color) {
    this.token_color = token_color;
  }

  setPosition(position) {
    this.position = position;
  }

  moveForward(steps) {
    this.position += steps;
  }

  moveBackward(steps) {
    this.position -= steps;
  }
}

module.exports.Token = Token;
