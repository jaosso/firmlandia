const User = require('../models/user').User;

class UserFactory {
    constructor(user_name_rules) {
        this.user_name_rules = user_name_rules;
        this.user_list = {};
    }

    create_user(user_name, user_color, user_connection) {
        var new_user_id = 0;
        var new_user = new User(new_user_id, user_name, user_color, user_connection);
        this.user_list[new_user_id] = new_user;

        return new_user;
    }
}

module.exports.UserFactory = UserFactory;