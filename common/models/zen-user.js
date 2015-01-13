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

  ZenUser.remoteMethod('userInterview', {
    returns: {root: true, type: 'Interview'},
    http: {path: '/myInterview', verb: 'get'},
    isStatic: false
  });

};
