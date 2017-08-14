// params/useValidateCommitMsg.js

const defaultWhen = require('../defaultWhen');

const name = 'use-validate-commit-msg';

module.exports = {
  name,
  option: {
    type: Boolean,
    desc: 'Whether install validate-commit-msg or not',
  },
  question(gen) {
    return {
      type: 'confirm',
      when(answers) {
        if (answers['use-standard-version']) {
          answers[name] = false;
          return false;
        }
        return defaultWhen(gen, name)(answers);
      },
    };
  },
};
