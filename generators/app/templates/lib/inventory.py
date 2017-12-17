#!/usr/bin/env python

import os

import yaml


def get_val(dct, key, default_value):
    if key in dct and dct[key] is not None:
        return dct[key]
    return default_value


def normalize_servers(data):
    ret = {}
    for env_name, env_data in data.items():
        ret[env_name] = {"sub_groups": {}, "groups": {}}
        if env_data is None:
            continue
        for group_name, group_data in get_val(env_data, "<sub_groups>", {}).items():
            if group_data is None:
                ret[env_name]["sub_groups"][group_name] = {"hosts": [], "vars": {}, "children": []}
                continue
            ret[env_name]["sub_groups"][group_name] = {
                "hosts": get_val(group_data, "hosts", []),
                "vars": get_val(group_data, "vars", {}),
                "children": get_val(group_data, "children", []),
            }
        for group_name, group_data in env_data.items():
            if group_name == "<sub_groups>":
                continue
            if group_data is None:
                ret[env_name]["groups"][group_name] = {
                    "hosts": {}, "vars": {"env": env_name}, "children": []}
                continue
            hosts = {}
            for idx, host_var in get_val(group_data, "hosts", {}).items():
                hosts[idx] = {} if host_var is None else host_var
            group_vars = get_val(group_data, "vars", {})
            ret[env_name]["groups"][group_name] = {
                "hosts": hosts, "vars": group_vars,
                "children": get_val(group_data, "children", []),
            }
            group_vars["env"] = env_name
            env_vars = get_val(group_data, "env_vars", {})
            if isinstance(env_vars, list):
                env_vars = dict((k, k.upper()) for k in env_vars)
            for k, v in env_vars.items():
                env_var = os.environ.get(v)
                if env_var is None:
                    group_vars.setdefault(k, None)
                else:
                    # env_vars overwrites vars
                    group_vars[k] = env_var
    return ret


def conv_inventories(data, env):
    hostvars = {}
    ret = {"_meta": {"hostvars": hostvars}}
    env_data = data[env]
    for group_name, group_data in env_data["sub_groups"].items():
        ret[group_name] = {
            "hosts": group_data["hosts"],
            "vars": group_data["vars"],
            "children": group_data["children"]}
    for group_name, group_data in env_data["groups"].items():
        hosts = []
        ret[group_name] = {
            "hosts": hosts,
            "vars": group_data["vars"],
            "children": group_data["children"]}
        for idx, hv in group_data["hosts"].items():
            host_id = "{}-{}.{}".format(group_name, idx, env)
            hostvar = {
                "idx": idx,
                "host_id": host_id}
            hostvar.update(hv)
            hostvars[host_id] = hostvar
            hosts.append(host_id)
    return ret


def read_cfg():
    with open(get_cfg_yaml_path()) as r:
        return yaml.load(r)


def read_data(cfg):
    with open(get_servers_yaml_path(cfg)) as r:
        return yaml.load(r)


def get_inventories():
    with open(get_cfg_yaml_path()) as r:
        cfg = yaml.load(r)
    with open(get_servers_yaml_path(cfg)) as r:
        servers = yaml.load(r)
    data = normalize_servers(servers)
    return dict(
        (env_name, conv_inventories(data, env_name))
        for env_name in data)
