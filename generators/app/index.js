'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.extendJSON('package.json', {
      scripts: {
        'standard-version': 'standard-version',
        commitmsg: 'validate-commit-msg'}});

    [
      '.envrc',
      '.gitignore',
      'Makefile',
      'README.md',
      'Vagrantfile',
      'ansible.cfg',
      'bin',
      'group_vars',
      'lib',
      'playbooks',
      'requirements.dev.in',
      'requirements.in',
      'roles.yml',
      'servers.yml',
      'ssh-keys/.keep'].forEach(key => {
        this.fs.copy(
          this.templatePath(key),
          this.destinationPath(key));
    });
  }

  install() {
    this.yarnInstall([
      'husky', 'standard-version', 'validate-commit-msg'], {dev: true});
    this.spawnCommand('direnv', ['allow']);
  }
};
