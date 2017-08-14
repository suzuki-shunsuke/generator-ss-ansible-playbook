// params/serversYamlPath.js

const defaultWhen = require('../defaultWhen');

const name = 'servers-yaml-path';

module.exports = {
  name,
  option: {
    type: String,
    desc: 'the path of servers.yml',
  },
  question(gen) {
    return {
      type: 'input',
      default: 'servers.yml',
      when: defaultWhen(gen, name),
    };
  },
};
