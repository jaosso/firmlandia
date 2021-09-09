class User {
    constructor(user_id, user_name, user_color, user_connection) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_color = user_color;
        this.user_connection = user_connection;
    }

    getId() {
        return this.user_id;
    }

    getName() {
        return this.user_name;
    }

    getColor() {
        return this.user_color;
    }

    getConnection() {
        return this.user_connection;
    }

    setName(user_name) {
        this.user_name = user_name;
    }

    setColor(user_color) {
        this.user_color = user_color;
    }

    setConnection(user_connection) {
        this.user_connection = user_connection;
    }
}

module.exports.User = User;