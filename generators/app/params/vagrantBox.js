const defaultWhen = require('../defaultWhen');

const name = 'vagrant-box';

module.exports = {
  name,
  option: {
    type: String,
    desc: 'vagrant box'
  },
  question(gen) {
    const question = {
      type: 'input',
      default: 'bento/centos-7.5'
    };
    question.when = defaultWhen(gen, name);
    return question;
  }
};
