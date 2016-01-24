function User(userData) {
    this.userID = userData.userID;
    this.name = userData.name;
    this.accountType = userData.accountType;
    this.lastLoginTime = userData.lastLoginTime;
};

User.prototype.login = function () {
    this.lastLoginTime = Date();
};

module.exports.createUser = function (userData) {
    return new User(userData);
};
