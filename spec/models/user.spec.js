const { User } = require('../../app/models/user');

require('../../app/models/user');

describe('User data object ', function () {
  var testUser;
  var testUserId = 0;
  var testUserName = 'Name';
  var testUserColor = 'Color';
  var testUserConnection = null;
  beforeAll(function () {
    testUser = new User(
      testUserId,
      testUserName,
      testUserColor,
      testUserConnection
    );
  });

  test('constructor creates object properly, succeeds', function () {
    expect(testUser).not.toEqual(null);
  });

  test('getters work properly, succeeds', function () {
    expect(testUser.getId()).toEqual(testUserId);
    expect(testUser.getName()).toEqual(testUserName);
    expect(testUser.getColor()).toEqual(testUserColor);
    expect(testUser.getConnection()).toEqual(testUserConnection);
  });

  test('setters work properly, succeeds', function () {
    var newUserName = 'New Name';
    var newUserColor = 'New Color';
    var newUserConnection = 'New Connection';
    
    testUser.setName(newUserName);
    testUser.setColor(newUserColor);
    testUser.setConnection(newUserConnection);

    expect(testUser.getName()).toEqual(newUserName);
    expect(testUser.getColor()).toEqual(newUserColor);
    expect(testUser.getConnection()).toEqual(newUserConnection);
  });
});
