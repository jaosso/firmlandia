var authenticator = require('../../app/controllers/authenticator').authenticator;

describe('Authenticate user, ', function () {

  describe('when password hash is wrong ', function() {
    var auth;
    var wrong_password_hash = 'wrong password';
    beforeAll(() => {
      var right_password_hash = 'right password';
      var user_name_rules = { 'min': 1, 'max': 24, 'allowed_characters_regex' : '/^[a-zöäüÖÄÜ\\s0-9]*$/mi'};
      auth = new authenticator(right_password_hash, user_name_rules);
    });

    test('and no username is provided, fails', function () {
      expect(auth.user_login('', wrong_password_hash)).toBeFalsy();
    });
  
    test('and invalid username is provided, fails', function () {
      expect(auth.user_login('invalid username1337!?', wrong_password_hash)).toBeFalsy();
    });

    test('and valid username is provided, fails', function () {
      expect(auth.user_login('valid username', wrong_password_hash)).toBeFalsy();
    });
  });

  describe('when password hash is right ', function() {
    var auth;
    var right_password_hash = 'right password';
    beforeAll(() => {
      var right_password_hash = 'right password';
      var user_name_rules = { 'min': 1, 'max': 24, 'allowed_characters_regex' : /^[a-z0-9\s]*$/i};
      auth = new authenticator(right_password_hash, user_name_rules);
    });

    test('and no username is provided, fails', function() {
      expect(auth.user_login('', right_password_hash)).toBeFalsy();
    });

    test('and invalid username is provided, fails', function() {
      expect(auth.user_login('invalid username1337!?', right_password_hash)).toBeFalsy();
    });

    test('and valid username is provided, succeeds', function() {
      expect(auth.user_login('valid username', right_password_hash)).toBeTruthy();
    });
  });
});
