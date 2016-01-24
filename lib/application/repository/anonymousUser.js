var _ = require('underscore');

var AnonymousUserRepository = {
    _anonymousUserStore: {},
    getUser: function (queryData, cb) {
        var anonymousUser = queryData && queryData.userID ? this._anonymousUserStore[queryData.userID] : null;
        if (anonymousUser) {
            cb(null, anonymousUser);
        }
        else {
            cb(null, null);
        }
    },
    addUser: function (anonymousUser, cb) {
        if (_.has(this._anonymousUserStore, anonymousUser.userID)) {
            cb(new Error("anonymousUser has exist"), null);
            return;
        }
        this._anonymousUserStore[anonymousUser.userID] = anonymousUser;
        cb(null, anonymousUser);
    },
    delUser: function (userID, cb) {
        if (!_.has(this._anonymousUserStore, userID)) {
            cb(new Error("anonymousUser has exist"), null);
            return;
        }
        delete this._anonymousUserStore[userID];
        cb(null, userID);
    },
    computeAnonymousUserID: function () {
        var currentDate = new Date();
        return "YK" + currentDate.getTime().toString();
    }
}

module.exports = AnonymousUserRepository;