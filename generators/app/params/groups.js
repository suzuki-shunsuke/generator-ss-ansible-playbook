// params/groups.js

const split = require('../split');
const defaultWhen = require('../defaultWhen');

const name = 'groups';

module.exports = {
  name,
  option: {
    type: String,
    desc: 'group names(space separeted)',
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
