var _ = require('lodash');
var passwd = require('password-maker');
var loopback = require('loopback');


module.exports = function (ZenUser) {

  ZenUser.prototype.userInterview = function (cb) {
    this.interviews({where: {state: 1}, limit: 1, include: {quizzAttempts: 'quizz'}}, function (er, res) {
      if (er) cb(er);
      else if (!res[0]) cb({name: "No Interview", message: "No interview found for that user", status: 404});
      else cb(null, res[0]);
    });
  };

  ZenUser.newSpecialUser = function (email, name, role, cb) {
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
      password: passwd(8),
      candidat: false
    };
    ZenUser.create(zenUser, function (er, user) {
      if (er) cb(er);
      else {
        user.generated = zenUser.password;
        var Role = ZenUser.app.models.Role;
        var RoleMapping = ZenUser.app.models.RoleMapping;
        Role.findOne({where: {name: role}}, function (er, r) {
          if (er) cb(er);
          else {
            console.log(Role);
            r.principals.create(
              {
                principalType: RoleMapping.USER,
                principalId: user.id
              },
              function (er) {
                if (er) cb(er);
                else cb(null, user);
              }
            );
          }
        });
      }
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

  ZenUser.hasRole = function (role, cb) {

    var RoleMapping = ZenUser.app.models.RoleMapping;
    var userId = loopback.getCurrentContext().active.accessToken.userId;

    if (role === 'zenika') {
      ZenUser.findById(userId, function (er, user) {
        if (er) cb(er);
        else {
          cb(null, !!user.zenika);
        }
      });
    } else {

      RoleMapping.find({where: {principalId: userId}, include: 'role'}, function (er, roles) {
        if (er) cb(er);
        else {
          if (_(roles).map(function (r) {
              return r.role();
            }).find({name: role}))        cb(null, true);
          else cb(null, false);
        }
      });

    }

  };

  ZenUser.googleProfileToUser = function profileToUser(provider, profile) {
    var email = profile.emails && profile.emails[0] && profile.emails[0].value;
    var normalName = profile.displayName || "Anonymous";
    var username = profile.username || profile.id;
    var password = passwd(10);
    var userObj = {
      username: username,
      password: password,
      email: email,
      candidat: false,
      normalName: normalName,
      zenika: true
    };
    return userObj;
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

  ZenUser.remoteMethod('newSpecialUser', {
    accepts: [
      {arg: 'email', type: 'string', required: true},
      {arg: 'name', type: 'string', required: true},
      {arg: 'role', type: 'string', required: true}
    ],
    returns: {root: true, type: 'ZenUser'},
    http: {path: '/createSpecialUser', verb: 'post'}
  });

  ZenUser.remoteMethod('listCandidats', {
    returns: {root: true, type: 'array'},
    http: {path: '/candidats', verb: 'get'}
  });

  ZenUser.remoteMethod('getCandidat', {
    accepts: [
      {arg: 'id', type: 'number', http: {source: 'path'}}
    ],
    returns: {root: true, type: 'ZenUser'},
    http: {path: '/candidat/:id', verb: 'get'}
  });

  ZenUser.remoteMethod('hasRole', {
    accepts: [
      {arg: 'role', type: 'string'}
    ],
    returns: {arg: 'hasRole', type: 'boolean'},
    http: {path: '/hasRole', verb: 'get'}
  });

};
