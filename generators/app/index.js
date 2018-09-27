'use strict';

const Generator = require('yeoman-generator');
const { Conflicter, Adapter } = require('yeoman-merge-ui');

const Params = require('./params');
const convName = require('./convName');
const prompting = require('./prompting');

const optionNames = [
  'vagrant-box',
  'groups',
  'envs'
];

const paramsHash = {};
optionNames.forEach(name => {
  paramsHash[name] = require(`./params/${convName(name)}`);
});

const params = new Params(
  optionNames.map(key => require(`./params/${convName(key)}`)));

module.exports = class extends Generator {
  constructor(args, opts) {
    const isSubGen = opts.isSubGen;
    delete opts.isSubGen;
    const ignoreFiles = opts.ignoreFiles || [];
    delete opts.ignoreFiles;
    super(args, opts);

    this.env.adapter = new Adapter();
    this.conflicter = new Conflicter(this.env.adapter, this.options.force);

    this.ignoreFiles = ignoreFiles;
    this.isSubGen = isSubGen;
    if (!isSubGen) {
      params.setOptions(this);
    }
  }
  prompting() {
    if (this.isSubGen) {
      this.answers = this.options;
      return;
    }
    return prompting(this, params, optionNames);
  }

  writing() {
    const answers = {};
    optionNames.forEach(key => {
      answers[convName(key)] = this.answers[key];
    });
    [
      'README.md',
      'group_vars/all.yml',
      'inventories',
      'lib',
      'requirements.in',
      'roles.yml',
      'script'].filter(key => {
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
    ['Vagrantfile', 'Makefile', 'Makefile.common', 'Makefile.prod', 'ansible.cfg', 'vagrant.yml'].filter(key => {
      return this.ignoreFiles.indexOf(key) === -1;
    }).forEach(key => {
      this.fs.copyTpl(
        this.templatePath(key),
        this.destinationPath(key), {
          groups: answers.groups,
          vagrantBox: answers.vagrantBox});
    });
    answers.envs.filter(env => env !== 'vagrant').forEach(env => {
      this.fs.copyTpl(
        this.templatePath('inventory.yml'),
        this.destinationPath(`${env}.yml`), {groups: answers.groups, env: env});
    });
    if (this.ignoreFiles.indexOf('playbooks') === -1) {
      answers.groups.filter(group => {
        return this.ignoreFiles.indexOf(`${group}.yml`) === -1;
      }).forEach(group => {
        this.fs.copyTpl(
          this.templatePath('playbook.yml'),
          this.destinationPath(`${group}.yml`), {group: group});
      });
    }
    if (this.ignoreFiles.indexOf('group_vars') === -1) {
      answers.groups.filter(group => {
        return this.ignoreFiles.indexOf(`group_vars/${group}.yml`) === -1;
      }).forEach(group => {
        this.fs.copyTpl(
          this.templatePath('group_vars/group.yml'),
          this.destinationPath(`group_vars/${group}.yml`), {group: group});
      });
    }
  }

  install() {
    this.spawnCommand('chmod', ['-R', 'a+x', 'inventories']);
    this.spawnCommand('direnv', ['allow']);
  }
};
