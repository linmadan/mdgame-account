var _ = require('underscore');
var AnonymousUserRepository = require('../repository/anonymousUser');

module.exports.auth = function (authData, cb) {
    var userID = authData && authData.userID ? authData.userID : null;
    if (_.isNull(userID)) {
        cb(null, true);
        return;
    }
    var queryData = {};
    queryData.userID = userID;
    AnonymousUserRepository.getUser(queryData, function(err,user){
        if(err){
            cb(err);
            return;
        }
        cb(null,!_.isNull(user));
    });
};