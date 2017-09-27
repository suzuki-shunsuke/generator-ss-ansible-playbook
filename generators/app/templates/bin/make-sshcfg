#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

import yaml

sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "lib")))

from inventory import read_cfg, read_data, normalize_servers  # noqa: E402
from make_sshcfg import SSHCfg  # noqa: E402


def main():
    cfg = read_cfg()
    data = normalize_servers(read_data(cfg))
    sshcfg = SSHCfg(cfg)
    sshcfg.write_sshcfg(data)


if __name__ == "__main__":
    main()
