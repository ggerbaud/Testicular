var _ = require('lodash');
var passwd = require("password-maker");


module.exports = function (ZenUser) {

  ZenUser.prototype.userInterview = function (cb) {
    this.interviews({where: {state: 1}, limit: 1, include: {quizzAttempts: 'quizz'}}, function (er, res) {
      if (er) cb(er);
      else if (!res[0]) cb({name: "No Interview", message: "No interview found for that user", status: 404});
      else cb(null, res[0]);
    });
  };

  ZenUser.newCandidat = function (email, name, cb) {
    if (!_.isString(email) || _.isEmpty(email)) {
      cb({message: "email should be a string", status: 400})
      return;
    }
    if (!_.isString(name) || _.isEmpty(name)) {
      cb({message: "name should be a string", status: 400})
      return;
    }
    var zenUser = {
      email: email,
      normalName: name,
      password: passwd({
        uppercase: false,
        symbols: false,
        numbers: true
      }, 8),
      candidat: true
    };
    ZenUser.create(zenUser, function (er, user) {
      if (er) cb(er);
      else {
        user.generated = zenUser.password;
        cb(null, user);
      }
    });
  };

  ZenUser.listCandidats = function (cb) {
    ZenUser.find({
      where: {candidat: true}
    }, cb);
  };

  ZenUser.getCandidat = function (id, cb) {
    ZenUser.findOne({
      where: {candidat: true, id: id}
    }, cb);
  };

  ZenUser.loginAndRole = function (data, cb) {
    ZenUser.login();
  };

  ZenUser.remoteMethod('userInterview', {
    returns: {root: true, type: 'Interview'},
    http: {path: '/myInterview', verb: 'get'},
    isStatic: false
  });

  ZenUser.remoteMethod('newCandidat', {
    accepts: [
      {arg: 'email', type: 'string', required: true},
      {arg: 'name', type: 'string', required: true}
    ],
    returns: {root: true, type: 'ZenUser'},
    http: {path: '/createCandidat', verb: 'post'}
  });

  ZenUser.remoteMethod('listCandidats', {
    returns: {root: true, type: 'ZenUser'},
    http: {path: '/candidats', verb: 'get'}
  });

  ZenUser.remoteMethod('getCandidat', {
    accepts: [
      {arg: 'id', type: 'number', http: {source: 'path'}}
    ],
    returns: {root: true, type: 'ZenUser'},
    http: {path: '/candidat/:id', verb: 'get'}
  });

};
