var should = require('should');
var account = require('../../lib/application/account');
var appError = require('../../lib/application/appError');

describe('AAccount use case test', function () {
    var aAccount = null;
    before( function () {
        aAccount = account.createAAccount();
    });
    context('register user #registerUser(userData,cb)', function () {
        it('anonymous user can register', function (done) {
            aAccount.registerUser({userID: "anonymousUser-1"}, function (err, userData) {
                userData.should.be.ok();
                userData.userID.should.be.eql("anonymousUser-1");
                userData.accountType.should.be.eql("anonymous");
                done();
            });
        });
    });
    context('get user data #getUserData(userID,accountType,cb)', function () {
        it('get anonymous user data', function (done) {
            var userID = "anonymousUser-1";
            var accountType = "anonymous";
            aAccount.getUserData(userID, accountType, function (err, userData) {
                userData.should.be.ok();
                userData.userID.should.be.eql("anonymousUser-1");
                userData.name.should.be.eql("anonymousUser-1");
                userData.accountType.should.be.eql("anonymous");
                done();
            });
        });
    });
    context('user auth #userAuth(authData,cb)', function () {
        it('anonymous user can auth pass', function (done) {
            var authData = {};
            aAccount.userAuth(authData, function (err, isPass) {
                isPass.should.be.eql(true);
                done();
            });
        });
        it('specify anonymous user can auth pass if exist', function (done) {
            var authData = {};
            authData.userID = "anonymousUser-1";
            aAccount.userAuth(authData, function (err, isPass) {
                isPass.should.be.eql(true);
                done();
            });
        });
        it('specify anonymous user can not auth pass if not exist', function (done) {
            var authData = {};
            authData.userID = "anonymousUser-10";
            aAccount.userAuth(authData, function (err, isPass) {
                isPass.should.be.eql(false);
                done();
            });
        });
    });
    context('user login #userLogin(userID,accountType,cb)', function () {
        it('anonymous user login', function (done) {
            var userID = "anonymousUser-1";
            var accountType = "anonymous";
            aAccount.userLogin(userID, accountType, function (err, isSuccess) {
                isSuccess.should.be.eql(true);
                done();
            });
        });
    });
    context('user logout #userLogout(userID,accountType,cb)', function () {
        it('anonymous user logout', function (done) {
            var userID = "anonymousUser-1";
            var accountType = "anonymous";
            aAccount.userLogout(userID, accountType, function (err, isSuccess) {
                isSuccess.should.be.eql(true);
                done();
            });
        });
    });
});