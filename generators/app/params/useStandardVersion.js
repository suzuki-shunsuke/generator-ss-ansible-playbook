// params/useStandardVersion.js

const defaultWhen = require('../defaultWhen');

const name = 'use-standard-version';

module.exports = {
  name,
  option: {
    type: Boolean,
    desc: 'Whether install standard-version or not',
  },
  question(gen) {
    return {
      type: 'confirm',
      when: defaultWhen(gen, name),
    };
  },
};

