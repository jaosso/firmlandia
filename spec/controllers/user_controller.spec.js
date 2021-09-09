var UserFactory = require('../../app/controllers/user_controller').UserFactory;

describe('User class ', function() {
    test('when nothing, succeeds', function(){
        expect(true).toBeTruthy();
    });
});

describe('User factory ', function() {

    var user_factory = new UserFactory(null);

    test('when valid user information is provided, succeeds', function() {
        var user_name = 'valid user name';
        var user_color = 'valid color';

        var new_user = user_factory.create_user(user_name, user_color);

        expect(new_user).not.toEqual(null);
        expect(new_user.user_name).toEqual(user_name);
        expect(new_user.user_color).toEqual(user_color);
    });
});