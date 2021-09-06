var authenticator = require('../../app/controllers/authenticator').authenticator;

describe('Authenticate user, ', function () {

  describe('when password is wrong', function() {
    var auth;
    beforeAll(() => {
      auth = new authenticator('wrong password');
    });

    test('and no username is provided, fails', function () {
      expect(auth.user_login('', '')).toBeFalsy();
    });
  
    test('and invalid username is provided, fails', function () {
      expect(auth.user_login('invalid username', 'wrong pwd')).toBeFalsy();
    });
  });
  
});
