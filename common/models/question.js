var _ = require('lodash');
module.exports = function (Question) {

  Question.unanswered = function (cb) {
    Question.find({include: 'answer'}, function (er, qs) {
      if (er) cb(er);
      else {
        cb(null, _.filter(qs, function (q) {
          return q.answer() === undefined || q.answer() === null;
        }))
      }
    });
  };

  Question.remoteMethod('unanswered', {
    returns: {root: true, type: 'Question'},
    http: {path: '/unanswered', verb: 'get'}
  });

};
