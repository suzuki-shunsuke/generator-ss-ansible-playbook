#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from jinja2 import Environment, FileSystemLoader
import yaml


class SSHCfg(object):

    def get_loader(self):
        return FileSystemLoader([
            os.path.dirname(__file__)])

    def get_env(self):
        return Environment(
            loader=self.get_loader(), autoescape=False,
            trim_blocks=True, lstrip_blocks=True)

    def get_tmpl(self):
        env = self.get_env()
        return env.get_template("sshcfg.j2")

    def get_conf_path(self):
        return os.path.abspath(os.path.join(
            os.path.dirname(__file__), "..", "servers.yml"))

    def get_sshcfg_path(self):
        return os.path.abspath(os.path.join(
            os.path.dirname(__file__), "..", "sshcfg"))

    def load_yaml(self):
        with open(self.get_conf_path()) as r:
            return yaml.load(r)

    def make_sshcfg_str(self, data):
        return self.get_tmpl().render(data=data)

    def write_sshcfg(self, data):
        with open(self.get_sshcfg_path(), "w") as w:
            w.write(self.make_sshcfg_str(data))
