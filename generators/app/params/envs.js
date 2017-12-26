// Params/envs.js

const split = require('../split');
const defaultWhen = require('../defaultWhen');

const name = 'envs';

module.exports = {
  name,
  option: {
    type: String,
    desc: 'env names(space separated, "vagrant" is added automatically)'
  },
  question(gen) {
    const question = {
      type: 'input',
      default: '',
      filter(input) {
        return split(input).concat(['vagrant']);
      }
    };
    question.when = defaultWhen(gen, name, question.filter);
    return question;
  }
};
