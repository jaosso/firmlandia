class authenticator {
  constructor(server_pwd) {
    this.server_pwd = server_pwd;
  }

  user_login (user_name, server_pwd) {
    console.log(user_name + ' ' + server_pwd);
    if (server_pwd == this.server_pwd) return true;
    return false;
  }
}

module.exports.authenticator = authenticator;