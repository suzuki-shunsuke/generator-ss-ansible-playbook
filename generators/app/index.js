'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'services',
      message: 'service names(space separeted)',
      default: 'app',
    }, {
      type: 'input',
      name: 'envs',
      message: 'env names(space separeted)',
      default: 'prod',
    }, {
      type: 'confirm',
      name: 'install_validate_commit_msg',
      message: 'Would you like to install validate-commit-msg?'
    }, {
      type: 'confirm',
      name: 'install_standard_version',
      message: 'Would you like to install standard-version?'
    }]).then(answers => {
      ['services', 'envs'].forEach(key => {
        answers[key] = answers[key].split(' ');
      });
      this.answers = answers;
    });
  }

  writing() {
    if (this.answers.install_standard_version) {
      this.fs.extendJSON('package.json', {
        scripts: {
          'standard-version': 'standard-version',
        }});
    }
    if (this.answers.install_validate_commit_msg) {
      this.fs.extendJSON('package.json', {
        scripts: {
          commitmsg: 'validate-commit-msg'}});
    }

    [
      '.envrc',
      '.gitignore',
      'Makefile',
      'README.md',
      'Vagrantfile',
      'ansible.cfg',
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
    ['servers.yml'].forEach(key => {
        this.fs.copyTpl(
          this.templatePath(key),
          this.destinationPath(key), this.answers);
    });
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
    if (this.answers.install_standard_version) {
      this.yarnInstall(['standard-version'], {dev: true});
    }
    if (this.answers.install_validate_commit_msg) {
      this.yarnInstall(['husky', 'validate-commit-msg'], {dev: true});
    }
    this.spawnCommand('direnv', ['allow']);
  }
};
