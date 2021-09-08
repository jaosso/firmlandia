class authenticator {
  constructor(server_password_hash, user_name_rules) {
    this.server_password_hash = server_password_hash;
    this.allowed_characters_regex = user_name_rules.allowed_characters_regex;
    this.min_user_name_length = user_name_rules.min;
    this.max_user_name_length = user_name_rules.max;
  }

  user_login(user_name, server_pwd) {
    if (
      server_pwd == this.server_password_hash &&
      check_if_user_name_is_valid(
        user_name,
        this.min_user_name_length,
        this.max_user_name_length,
        this.allowed_characters_regex
      )
    ) {
      return true;
    }
    return false;
  }
}

function check_if_user_name_is_valid(
  user_name,
  min_user_name_length,
  max_user_name_length,
  allowed_characters_regex
) {
  if (
    user_name.length >= min_user_name_length &&
    user_name.length <= max_user_name_length
  ) {
    if (allowed_characters_regex.test(user_name)) {
      return true;
    }
  }
  return false;
}

module.exports.authenticator = authenticator;
