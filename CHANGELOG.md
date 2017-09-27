# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.5.0"></a>
# [2.5.0](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.4.0...v2.5.0) (2017-09-27)


### Features

* support children of the host group ([04c8cc3](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/04c8cc3))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.3.1...v2.4.0) (2017-09-15)


### Features

* add ansible and test entry in Makefile ([040d51f](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/040d51f))
* add hostvars ([97667c5](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/97667c5))



<a name="2.3.1"></a>
## [2.3.1](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.3.0...v2.3.1) (2017-09-11)


### Bug Fixes

* remove some dependencies to direnv ([8f81be9](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/8f81be9))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.2.2...v2.3.0) (2017-09-06)


### Features

* add the isSubGen option to use this generator as a sub generator ([b7a7653](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/b7a7653))



<a name="2.2.2"></a>
## [2.2.2](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.2.1...v2.2.2) (2017-08-30)


### Bug Fixes

* fix Makefile ([c383d0d](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/c383d0d))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.2.0...v2.2.1) (2017-08-29)



<a name="2.2.0"></a>
# [2.2.0](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.1.0...v2.2.0) (2017-08-29)


### Features

* add `make _roles` ([d5013ff](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/d5013ff))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.0.1...v2.1.0) (2017-08-28)


### Features

* add ignoreFiles ([2102236](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/2102236))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v2.0.0...v2.0.1) (2017-08-28)


### Bug Fixes

* fix bin/inventory ([77b3cc8](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/77b3cc8))
* fix the path of servers.yml in Vagrantfile ([f149c3f](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/f149c3f))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v1.0.3...v2.0.0) (2017-08-28)


### Bug Fixes

* abolish the installation of standard-version and validate-commit-msg and husky ([773b78e](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/773b78e))


### BREAKING CHANGES

* abolish the installation of standard-version and validate-commit-msg and husky

Remove --use-standard-version and --validate-commit-msg options.
If you want to install standard-version and validate-commit-msg and
husky in the same manner as before,
use `generator-ss-standard-version` or `generator-ss-validate-commit-msg`.



<a name="1.0.3"></a>
## [1.0.3](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v1.0.2...v1.0.3) (2017-08-28)


### Bug Fixes

* fix the template of `servers.yml` ([46be945](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/46be945))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v1.0.1...v1.0.2) (2017-08-27)


### Bug Fixes

* [#9](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/issues/9) make files on the `bin` directory executable ([ff6b2bc](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/ff6b2bc))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/compare/v1.0.0...v1.0.1) (2017-08-27)


### Bug Fixes

* [#7](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/issues/7) rename .gitignore to gitignore ([af3365b](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/af3365b))



<a name="1.0.0"></a>
# 1.0.0 (2017-08-21)


### Bug Fixes

* adjust spaces and newlines in the template ([856a0c3](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/856a0c3))
* remove japanese ([c6b8587](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/c6b8587))


### Features

* add options ([a962248](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/a962248))
* add user interaction ([a8d4383](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/a8d4383))
* allow to configure paths of servers.yml and sshcfg ([3ef663a](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/3ef663a))
* release the version 1.0.0 ([768cc14](https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook/commit/768cc14))
