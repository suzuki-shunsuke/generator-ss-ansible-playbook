#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

sys.path.append(os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", "lib")))

from make_all_playbook import AllPlaybook  # noqa: E402


def main():
    all_playbook = AllPlaybook()
    env = os.environ["ENV"]
    all_playbook.run(env)


if __name__ == "__main__":
    main()
