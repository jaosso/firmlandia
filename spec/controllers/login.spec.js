require('module-alias/register');

const login = require('../../app/controllers/login');

describe('Creates new user, ', function () {
  test('when no username and no password is provided, fails', function () {
    expect(login.login('', '')).toBeFalsy();
  });
});
