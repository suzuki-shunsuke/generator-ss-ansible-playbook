// params/services.js

const split = require('../split');
const defaultWhen = require('../defaultWhen');

const name = 'services';

module.exports = {
  name,
  option: {
    type: String,
    desc: 'service names(space separeted)',
  },
  question(gen) {
    const question = {
      type: 'input',
      default: 'app',
      filter: split,
    };
    question.when = defaultWhen(gen, name, question.filter);
    return question;
  },
};
