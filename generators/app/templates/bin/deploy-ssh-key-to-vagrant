#!/bin/bash

set -e

# バックアップをとっておく
cp /home/vagrant/.ssh/authorized_keys /home/vagrant/.ssh/authorized_keys.bak
# 鍵がなければ生成(パスフレーズなし)
test -f /vagrant/ssh-keys/$1.vagrant.pub || ssh-keygen -t rsa -f /vagrant/ssh-keys/$1.vagrant -N ""
# 既存の鍵と新しい鍵を結合する。
# 重複しないようにuniqコマンドを使う
cat /home/vagrant/.ssh/authorized_keys /vagrant/ssh-keys/$1.vagrant.pub | uniq > /tmp/authorized_keys
cat /tmp/authorized_keys > /home/vagrant/.ssh/authorized_keys
# プロビジョニングはrootユーザーで実行される
chown -R vagrant:vagrant /home/vagrant/.ssh/*
rm /tmp/authorized_keys

# private networkで設定したipにpingが通らない場合の対応
systemctl restart network
