import service  from './service';

const getQuestions = (res, topic, options) => service.getQuestions(res, topic, options);
const createStubs = (res, topic, stubs) => service.createStubs(res, topic, stubs);

export default { getQuestions, createStubs };