#!/usr/bin/env python

"""
environment variable inventory source

If the environment variable is undefined, the variable is also undefined.
The group level environment variables are only supported, and the host level environment variables are not supported.
The environment variable name must be uppercase.

## Examples

The environment variable "FOO" is assigned to the variable "foo".

```yaml
env_vars:
  - foo
```

The environment variable "FOO" is assigned to the variable "bar".

```yaml
env_vars:
  bar: foo
```
"""

import argparse
import json
import os
import sys

import yaml


def main():
    parser = get_parser()
    args = parser.parse_args()
    if "ENV" not in os.environ:
        sys.stdout.write("[ERROR] The environment variable 'ENV' is required.\n")
        sys.exit(1)
    env = os.environ["ENV"]
    if args.list:
        do_list(env)
    if args.host:
        do_host(env, args.host)


def do_host(env, hostname):
    ret = {}
    json.dump(ret, sys.stdout)


def do_list(env):
    ret = {}
    with open("{}.yml".format(env)) as r:
        groups = [("all", yaml.load(r)["all"])]
    while groups:
        group_name, group = groups.pop()
        node, children = parse_group(group)
        ret[group_name] = node
        for name, child in children.items():
            groups.append((name, child))
    json.dump(ret, sys.stdout)


def get_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument("--list", action="store_true")
    parser.add_argument("--host")
    return parser


def parse_group(group):
    env_vars = group.get("env_vars", {})
    ev = {}
    if env_vars is None:
        pass
    elif isinstance(env_vars, list):
        for e in env_vars:
            k = e.upper()
            if k in os.environ:
                ev[e] = os.environ[k]
    elif isinstance(env_vars, dict):
        for k,v in env_vars.items():
            env_name = v.upper()
            if env_name in os.environ:
                ev[k] = os.environ[env_name]
    children = group.get("children", {})
    hostvars = group.get("hosts", {})
    if hostvars is None:
        hostvars = {}
    ret = {
        "hosts": hostvars.keys() if isinstance(hostvars, dict) else hostvars,
        "vars": ev,
        "children": children.keys()
    }
    return ret, children


if __name__ == "__main__":
    main()
