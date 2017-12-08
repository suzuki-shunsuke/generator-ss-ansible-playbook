#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

import yaml

sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "lib")))

from inventory import read_cfg, read_data, normalize_servers  # noqa: E402
from make_all_playbook import AllPlaybook  # noqa: E402


def main():
    all_playbook = AllPlaybook()
    all_playbook.run()


if __name__ == "__main__":
    main()
