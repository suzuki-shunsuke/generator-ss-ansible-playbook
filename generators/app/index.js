'use strict';

const Generator = require('yeoman-generator');

const Params = require('./params');
const convName = require('./convName');
const prompting = require('./prompting');

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
    const ignoreFiles = opts.ignoreFiles || [];
    delete opts.ignoreFiles;
    super(args, opts);
    this.ignoreFiles = ignoreFiles;
    params.setOptions(this);
  }
  prompting() {
    return prompting(this, params, optionNames);
  }

  writing() {
    const answers = {};
    optionNames.forEach(key => {
      answers[convName(key)] = this.answers[key];
    });
    [
      'README.md',
      'bin',
      'group_vars/all.yml',
      'lib',
      'requirements.dev.in',
      'requirements.in',
      'roles.yml',
      'ssh-keys/.keep'].filter(key => {
        return this.ignoreFiles.indexOf(key) === -1;
      }).forEach(key => {
        this.fs.copy(
          this.templatePath(key),
          this.destinationPath(key));
    });
    if (this.ignoreFiles.indexOf('.gitignore') === -1) {
      this.fs.copy(
        this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    }
    if (this.ignoreFiles.indexOf('.envrc') === -1) {
      this.fs.copy(
        this.templatePath('envrc'), this.destinationPath('.envrc'));
    }
    ['Vagrantfile', 'Makefile', 'ansible.cfg', 'cfg.yml'].filter(key => {
      return this.ignoreFiles.indexOf(key) === -1;
    }).forEach(key => {
      this.fs.copyTpl(
        this.templatePath(key),
        this.destinationPath(key), answers);
    });
    if (this.ignoreFiles.indexOf('servers.yml') === -1) {
      this.fs.copyTpl(
        this.templatePath('servers.yml'),
        this.destinationPath(answers.serversYamlPath), answers);
    }
    if (this.ignoreFiles.indexOf('playbooks') === -1) {
      answers.services.filter(service => {
        return this.ignoreFiles.indexOf(`playbooks/${service}.yml`) === -1;
      }).forEach(service => {
        this.fs.copyTpl(
          this.templatePath('playbooks/service.yml'),
          this.destinationPath(`playbooks/${service}.yml`), {service: service});
      });
    }
    if (this.ignoreFiles.indexOf('group_vars') === -1) {
      answers.services.filter(service => {
        return this.ignoreFiles.indexOf(`group_vars/${service}.yml`) === -1;
      }).forEach(service => {
        this.fs.copyTpl(
          this.templatePath('group_vars/service.yml'),
          this.destinationPath(`group_vars/${service}.yml`), {service: service});
      });
    }
  }

  install() {
    this.spawnCommand('direnv', ['allow']);
    this.spawnCommand('chmod', ['-R', 'a+x', 'bin']);
  }
};
