'use strict';

const Generator = require('yeoman-generator');

const Params = require('./params');
const convName = require('./convName');

const optionNames = [
  'services',
  'envs',
  'sshcfg-path',
  'servers-yaml-path',
];

const paramsHash = {};
optionNames.forEach(name => {
  paramsHash[name] = require(`./params/${convName(name)}`);
});

const params = new Params(
  optionNames.map(key => require(`./params/${convName(key)}`)));

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    params.setOptions(this);
  }
  prompting() {
    const questions = params.getQuestions(this);
    const invQuestions = {};
    questions.forEach(question => {
      invQuestions[question.name] = question;
    });
    return this.prompt(questions).then(answers => {
      const ret = {};
      optionNames.forEach(name => {
        if (this.options[name] !== undefined) {
          const filter = invQuestions[name].filter;
          ret[convName(name)] = filter ? filter(this.options[name]) : this.options[name];
        } else {
          ret[convName(name)] = answers[name];
        }
      });
      this.answers = ret;
    });
  }

  writing() {
    [
      'README.md',
      'Vagrantfile',
      'bin',
      'group_vars/all.yml',
      'lib',
      'requirements.dev.in',
      'requirements.in',
      'roles.yml',
      'ssh-keys/.keep'].forEach(key => {
        this.fs.copy(
          this.templatePath(key),
          this.destinationPath(key));
    });
    this.fs.copy(
      this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(
      this.templatePath('envrc'), this.destinationPath('.envrc'));
    ['Makefile', 'ansible.cfg', 'cfg.yml'].forEach(key => {
      this.fs.copyTpl(
        this.templatePath(key),
        this.destinationPath(key), this.answers);
    });
    this.fs.copyTpl(
      this.templatePath('servers.yml'),
      this.destinationPath(this.answers.serversYamlPath), this.answers);
    this.answers.services.forEach(service => {
      this.fs.copyTpl(
        this.templatePath('playbooks/service.yml'),
        this.destinationPath(`playbooks/${service}.yml`), {service: service});
      this.fs.copyTpl(
        this.templatePath('group_vars/service.yml'),
        this.destinationPath(`group_vars/${service}.yml`), {service: service});
    });
  }

  install() {
    this.spawnCommand('direnv', ['allow']);
    this.spawnCommand('chmod', ['-R', 'a+x', 'bin']);
  }
};
