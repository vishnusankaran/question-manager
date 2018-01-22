import service  from './service';

const getQuestions = (res, topic, options) => service.getQuestions(res, topic, options);

export default { getQuestions };