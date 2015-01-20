module.exports = function(Quizz) {

  Quizz.prototype.safeDelete = function(cb) {
    this.questions(function(er, qs) {
      if(er) cb(er);
      else {
        if(qs) {
          if(qs.length > 0) {
            cb(null, false);
            return;
          }
        }
        this.destroy(function(er) {
          if(er) cb(er);
          else cb(null, true);
        })
      }
    }.bind(this));
  };

  Quizz.remoteMethod('safeDelete', {
    returns: {arg: 'deleted', type: 'boolean'},
    http: {path: '/safeDeleteById', verb: 'DELETE'},
    isStatic: false
  });

};
