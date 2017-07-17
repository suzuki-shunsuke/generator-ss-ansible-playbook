# ansible-playbook-example

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
