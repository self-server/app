#!/bin/bash
su -
apt-get update && apt-get upgrade -y
apt-get install sudo -y

usermod -aG sudo administrator
systemctl restart sshd.service

