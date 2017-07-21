# ansible playbook

This playbook is based on https://github.com/suzuki-shunsuke/generator-ss-ansible-playbook

## Requirements

* pyenv
* direnv
* yarn
* Node.js

## Setup

```
$ direnv allow
$ pip install pip-tools
$ make
$ ansible-galaxy install -r roles.yml
$ yarn
$ vagrant up
```

## Run playbook

```
$ play <env> <role>
```
