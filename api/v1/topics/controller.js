import service  from './service';

const getQuestions = function(done) {
  service.getQuestions(done);
}

module.exports = {
    getQuestions
}