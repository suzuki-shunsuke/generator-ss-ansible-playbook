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
      message: 'env names(space separated, "vagrant" is added automatically)',
      default: '',
    }, {
      type: 'input',
      name: 'sshcfg_path',
      message: 'the path of sshcfg',
      default: 'sshcfg',
    }, {
      type: 'input',
      name: 'servers_yaml_path',
      message: 'the path of servers.yml',
      default: 'servers.yml',
    }, {
      type: 'confirm',
      name: 'install_standard_version',
      message: 'Would you like to install standard-version?'
    }, {
      type: 'confirm',
      name: 'install_validate_commit_msg',
      message: 'Would you like to install validate-commit-msg?',
      when(answers) {
        return !answers.install_standard_version;
      },
    }]).then(answers => {
      ['services', 'envs'].forEach(key => {
        const items = [];
        answers[key].split(' ').forEach(item => {
          item = item.trim();
          if (item.length) {
            items.push(item);
          }
        });
        answers[key] = items;
      });
      answers.envs.push('vagrant');
      this.answers = answers;
    });
  }

  writing() {
    if (this.answers.install_standard_version) {
      this.composeWith(require.resolve(
        'generator-ss-standard-version/generators/app'));
    }
    if (this.answers.install_validate_commit_msg) {
      this.composeWith(require.resolve(
        'generator-ss-validate-commit-msg/generators/app'));
    }

    [
      '.envrc',
      '.gitignore',
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
    ['Makefile', 'ansible.cfg', 'cfg.yml'].forEach(key => {
        this.fs.copyTpl(
          this.templatePath(key),
          this.destinationPath(key), this.answers);
    });
    this.fs.copyTpl(
      this.templatePath('servers.yml'),
      this.destinationPath(this.answers.servers_yaml_path), this.answers);
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
  }
};
