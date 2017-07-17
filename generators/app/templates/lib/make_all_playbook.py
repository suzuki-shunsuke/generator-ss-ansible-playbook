#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from jinja2 import Environment, FileSystemLoader
import yaml


class AllPlaybook(object):

    def get_src_path(self):
        return os.path.abspath(os.path.join(
            os.path.dirname(__file__), "..", "servers.yml"))

    def get_dest_path(self):
        return os.path.abspath(os.path.join(
            os.path.dirname(__file__), "..", "playbooks", "all.yml"))

    def load_yaml(self):
        with open(self.get_src_path()) as r:
            return yaml.load(r)

    def conv_data(self, data):
        roles = set()
        for env, env_data in data.items():
            for role in env_data:
                roles.add(role)
        return [{"include": "{}.yml".format(role)} for role in roles]

    def run(self):
        with open(self.get_dest_path(), "w") as w:
            yaml.dump(self.conv_data(self.load_yaml()), w)
