#!/bin/bash

set -e

SSH_KEY_PATH=/vagrant/.vagrant/id_rsa

cp /home/vagrant/.ssh/authorized_keys /tmp/authorized_keys.bak
test -f ${SSH_KEY_PATH}.pub || ssh-keygen -t rsa -f $SSH_KEY_PATH -N ""
cat /home/vagrant/.ssh/authorized_keys ${SSH_KEY_PATH}.pub | uniq > /tmp/authorized_keys
cat /tmp/authorized_keys > /home/vagrant/.ssh/authorized_keys
chown -R vagrant:vagrant /home/vagrant/.ssh/*
rm /tmp/authorized_keys

systemctl restart network
