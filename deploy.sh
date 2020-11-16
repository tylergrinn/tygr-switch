#!/bin/sh

# SSH Setup
echo $SSH_KEY | base64 -d > /tmp/deploy_rsa
eval "$(ssh-agent -s)"
chmod 600 /tmp/deploy_rsa
ssh-add /tmp/deploy_rsa

rsync -r --delete dist/ node@tygr.info:@tygr/tabs
