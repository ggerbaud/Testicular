module.exports = function (ZenUser) {

  ZenUser.prototype.userInterview = function (cb) {
    this.interviews({where: {state: 1}, limit: 1, include: {quizzAttempts: 'quizz'}}, function (er, res) {
      if (er) cb(er);
      cb(null, res[0]);
    });
  };

  ZenUser.remoteMethod('userInterview', {
    returns: {root: true, type: 'Interview'},
    http: {path: '/myInterview', verb: 'get'},
    isStatic: false
  });

};
