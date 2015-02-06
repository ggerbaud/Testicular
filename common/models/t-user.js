var _ = require('lodash');
var passwd = require('password-maker');
var loopback = require('loopback');


module.exports = function (TUser) {

  TUser.prototype.userInterview = function (cb) {
    this.interviews({where: {state: 1}, limit: 1, include: {quizzAttempts: 'quizz'}}, function (er, res) {
      if (er) cb(er);
      else if (!res[0]) cb({name: "No Interview", message: "No interview found for that user", status: 404});
      else cb(null, res[0]);
    });
  };

  TUser.newSpecialUser = function (email, name, role, cb) {
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
    TUser.create(zenUser, function (er, user) {
      if (er) cb(er);
      else {
        user.generated = zenUser.password;
        var Role = TUser.app.models.Role;
        var RoleMapping = TUser.app.models.RoleMapping;
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

  TUser.newCandidat = function (email, name, cb) {
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
    TUser.create(zenUser, function (er, user) {
      if (er) cb(er);
      else {
        user.generated = zenUser.password;
        cb(null, user);
      }
    });
  };

  TUser.listCandidats = function (cb) {
    TUser.find({
      where: {candidat: true}
    }, cb);
  };

  TUser.getCandidat = function (id, cb) {
    TUser.findOne({
      where: {candidat: true, id: id}
    }, cb);
  };

  TUser.hasRole = function (role, cb) {

    var RoleMapping = TUser.app.models.RoleMapping;
    var userId = loopback.getCurrentContext().active.accessToken.userId;

    if (role === 'editor') {
      TUser.findById(userId, function (er, user) {
        if (er) cb(er);
        else {
          cb(null, !!user.editor);
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

  TUser.googleProfileToUser = function profileToUser(provider, profile) {
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
      editor: true
    };
    return userObj;
  };

  TUser.remoteMethod('userInterview', {
    returns: {root: true, type: 'Interview'},
    http: {path: '/myInterview', verb: 'get'},
    isStatic: false
  });

  TUser.remoteMethod('newCandidat', {
    accepts: [
      {arg: 'email', type: 'string', required: true},
      {arg: 'name', type: 'string', required: true}
    ],
    returns: {root: true, type: 'TUser'},
    http: {path: '/createCandidat', verb: 'post'}
  });

  TUser.remoteMethod('newSpecialUser', {
    accepts: [
      {arg: 'email', type: 'string', required: true},
      {arg: 'name', type: 'string', required: true},
      {arg: 'role', type: 'string', required: true}
    ],
    returns: {root: true, type: 'TUser'},
    http: {path: '/createSpecialUser', verb: 'post'}
  });

  TUser.remoteMethod('listCandidats', {
    returns: {root: true, type: 'array'},
    http: {path: '/candidats', verb: 'get'}
  });

  TUser.remoteMethod('getCandidat', {
    accepts: [
      {arg: 'id', type: 'number', http: {source: 'path'}}
    ],
    returns: {root: true, type: 'TUser'},
    http: {path: '/candidat/:id', verb: 'get'}
  });

  TUser.remoteMethod('hasRole', {
    accepts: [
      {arg: 'role', type: 'string'}
    ],
    returns: {arg: 'hasRole', type: 'boolean'},
    http: {path: '/hasRole', verb: 'get'}
  });

};
