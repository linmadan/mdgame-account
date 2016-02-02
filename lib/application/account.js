var _ = require('underscore');
var dUser = require('../domain/user');
var anonymousAuthService = require('./authService/anonymousAuthService');
var AnonymousUserRepository = require('./repository/anonymousUser');

var AAccount = {};
AAccount.registerUser = function (userData, cb) {
    var userRepositorys = {
        "anonymous": AnonymousUserRepository
    };
    var userRepository = userData && userData.registerWay ? userRepositorys[userData.registerWay] : userRepositorys["anonymous"];
    if (_.isUndefined(userRepository)) {
        cb(new Error("userRepository is not exist"), null);
        return;
    }
    var userID = userData && userData.userID ? userData.userID : AnonymousUserRepository.computeAnonymousUserID();
    var accountType = userData && userData.accountType ? userData.accountType : "anonymous";
    var userName = userData && userData.userName ? userData.userName : userID;
    var userIconImage = userData && userData.userIconImage ? userData.userIconImage : "default.png";
    var newUserData = {};
    newUserData.userID = userID;
    newUserData.userName = userName;
    newUserData.accountType = accountType;
    newUserData.userIconImage = userIconImage;
    newUserData.lastLoginTime = null;
    var user = dUser.createUser(newUserData);
    userRepository.addUser(user, function (err, user) {
        cb(err, newUserData);
    });
};

AAccount.userAuth = function (authData, cb) {
    var authServices = {
        "anonymous": anonymousAuthService
    };
    var authService = authData && authData.authWay ? authServices[authData.authWay] : authServices["anonymous"];
    if (_.isUndefined(authService)) {
        cb(new Error("authService is not exist"), null);
        return;
    }
    authService.auth(authData, function (err, isPass) {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, isPass);
    });
};

AAccount.userLogin = function (userID, accountType, cb) {
    var userRepositorys = {
        "anonymous": AnonymousUserRepository
    };
    var userRepository = accountType ? userRepositorys[accountType] : userRepositorys[accountType];
    if (_.isUndefined(userRepository)) {
        cb(new Error("userRepository is not exist"), null);
        return;
    }
    var queryData = {};
    queryData.userID = userID;
    userRepository.getUser(queryData, function (err, user) {
        if (err) {
            cb(err, null);
            return;
        }
        if (_.isNull(user)) {
            cb(null, false);
            return;
        }
        user.login();
        cb(null, true);
    });
};

AAccount.userLogout = function (userID, accountType, cb) {
    var userRepositorys = {
        "anonymous": AnonymousUserRepository
    };
    var userRepository = accountType ? userRepositorys[accountType] : userRepositorys[accountType];
    if (_.isUndefined(userRepository)) {
        cb(new Error("userRepository is not exist"), null);
        return;
    }
    userRepository.delUser(userID, function (err, userID) {
        if (err) {
            cb(err, null);
            return;
        }
        if (_.isNull(userID)) {
            cb(null, false);
            return;
        }
        cb(null, true);
    });
};

AAccount.getUserData = function (userID, accountType, cb) {
    var userRepositorys = {
        "anonymous": AnonymousUserRepository
    };
    var userRepository = accountType ? userRepositorys[accountType] : userRepositorys[accountType];
    if (_.isUndefined(userRepository)) {
        cb(new Error("userRepository is not exist"), null);
        return;
    }
    var queryData = {};
    queryData.userID = userID;
    userRepository.getUser(queryData, function (err, user) {
        if (err) {
            cb(err, null);
            return;
        }
        if (!user) {
            cb(null, null);
            return;
        }
        var userData = {};
        userData.userID = user.userID;
        userData.userName = user.userName;
        userData.userIconImage = user.userIconImage;
        userData.accountType = user.accountType;
        userData.lastLoginTime = user.lastLoginTime;
        cb(null, userData);
    });
}

module.exports = AAccount;

