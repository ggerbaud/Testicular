module.exports = function (QuizzAttempt) {

  // state = 1 : not validated, 2 : validated, 3 : corrected

  QuizzAttempt.prototype.quizzInfo = function (cb) {
    var out = {};
    out.attempt = this;
    this.quizz(function (er, quizz) {
      if (er) cb(er);
      QuizzAttempt.questions({
        where: {
          quizzId: quizz.id
        }
      }, function (er, qs) {
        if (er) cb(er);
        out.nbQuestion = qs.length;
        out.quizzName = quizz.name;
        cb(null, out);
      })
    });
  };

  QuizzAttempt.prototype.quizzQuestions = function (n, cb) {
    var error = {name: "No Question", message: "That question does not exist", status: 404};
    var out = {};
    var self = this;
    if(this.state > 1) cb(error);
    else {
      this.quizz(function (er, quizz) {
        if (er) cb(er);

        QuizzAttempt.questions({
          where: {
            quizzId: quizz.id
          },
          include: 'question',
          order: 'order ASC',
          skip: n,
          limit: 1
        }, function (er, qs) {
          if (er) cb(er);
          else if (!qs || qs.length == 0) cb(error);
          else {
            out.question = qs[0].question();
            out.rank = n;
            self.attempts({
              where: {
                and: [{quizzAttemptId: self.id}, {questionId: out.question.id}]
              }
            }, function (er, atts) {
              if (er) {
                out.attempt = null;
              } else {
                out.attempt = atts[0];
              }
              cb(null, out);
            });
          }
        });
      });
    }
  };

  QuizzAttempt.prototype.validate = function (cb) {
    this.state = 2;
    this.save(function (er, obj) {
      if (er) cb(er);
      else QuizzAttempt.findOne({
        where: {
          userId: this.userId,
          state: 1
        }
      }, function (er, res) {
        if (er) cb(er);
        else if (res) {
          console.log(res);
          cb(null,200);
        } else {
          this.interview(function (er, itw) {
            if (er) cb(er);
            else {
              itw.state = 2;
              itw.save(function (er) {
                if (er) cb(er);
                cb(null, 204);
              });
            }
          });
        }
      }.bind(this));
    }.bind(this));
  };

  QuizzAttempt.questions = function (filter, cb) {
    QuizzAttempt.app.models.QuizzQuestion.find(filter, cb);
  };

  QuizzAttempt.remoteMethod('quizzInfo', {
    returns: {root: true, type: 'object'},
    http: {path: '/infos', verb: 'get'},
    isStatic: false
  });

  QuizzAttempt.remoteMethod('quizzQuestions', {
    accepts: [
      {arg: 'n', type: 'number', http: {source: 'path'}}
    ],
    returns: {root: true, type: 'object'},
    http: {path: '/question/:n', verb: 'get'},
    isStatic: false
  });

  QuizzAttempt.remoteMethod('validate', {
    returns: {type: 'number', arg: 'status'},
    http: {path: '/validate', verb: 'get'},
    isStatic: false
  });

};
