// params/sshcfgPath.js

const defaultWhen = require('../defaultWhen');

const name = 'sshcfg-path';

module.exports = {
  name,
  option: {
    type: String,
    desc: 'the path of sshcfg',
  },
  question(gen) {
    return {
      type: 'input',
      default: 'sshcfg',
      when: defaultWhen(gen, name),
    };
  },
};
