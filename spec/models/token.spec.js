var Token = require('../../app/models/token').Token;

describe('Token data object ', function () {
  var token;
  var player_id = 0;
  var token_color = 'red';
  var position = 0;
  beforeEach(function () {
    token = new Token(player_id, token_color, position);
  });

  test('constructor creates object properly, succeeds', function () {
    expect(token).not.toEqual(null);
  });

  test('getters work properly, succeeds', function () {
    expect(token.getPlayerId()).toEqual(player_id);
    expect(token.getTokenColor()).toEqual(token_color);
    expect(token.getPosition()).toEqual(position);
  });

  test('setters work properly, succeeds', function () {
    var newTokenColor = 'blue';
    var newPosition = 10;

    token.setTokenColor(newTokenColor);
    token.setPosition(newPosition);
    expect(token.getTokenColor()).toEqual(newTokenColor);
    expect(token.getPosition()).toEqual(newPosition);
  });

  test('token moves forward properly, succeeds', function () {
    var steps = 6;
    var oldPosition = token.getPosition();
    token.moveForward(steps);
    var newPosition = token.getPosition();

    expect(newPosition - oldPosition).toEqual(steps);
  });

  test('token moves backward properly, succeeds', function () {
    var steps = 6;
    var oldPosition = token.getPosition();
    token.moveBackward(steps);
    var newPosition = token.getPosition();

    expect(oldPosition - newPosition).toEqual(steps);
  });
});
