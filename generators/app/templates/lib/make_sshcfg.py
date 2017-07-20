#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from jinja2 import Environment, FileSystemLoader
import yaml


class SSHCfg(object):

    def __init__(self, cfg):
        self.cfg = cfg
        self.servers_yml_path = os.path.realpath(
            os.path.join(
                os.path.dirname(__file__), "..", self.cfg["servers_yml_path"]))
        self.sshcfg_path = os.path.realpath(
            os.path.join(
                os.path.dirname(__file__), "..", self.cfg["sshcfg_path"]))

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

    def load_yaml(self):
        with open(self.servers_yml_path) as r:
            return yaml.load(r)

    def make_sshcfg_str(self, data):
        return self.get_tmpl().render(data=data)

    def write_sshcfg(self, data):
        with open(self.sshcfg_path, "w") as w:
            w.write(self.make_sshcfg_str(data))
