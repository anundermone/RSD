#/bin/sh
set -eu

echo "$SSH_KEY" > key
chmod 600 key

echo 'Copying build files to server...'

scp \
    -P $SSH_PORT \
    -i key \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -o GSSAPIAuthentication=no \
    -o PasswordAuthentication=no \
    -v \
    -r \
    build/. \
    $SSH_ADDRESS:build

echo 'Replacing website files...'

ssh \
    -p $SSH_PORT \
    -i key \
    -o StrictHostKeyChecking=no \
    -o UserKnownHostsFile=/dev/null \
    -v \
    $SSH_ADDRESS \
    'rm -r public_html/* & cp -r build/. public_html & rm -rf build'

echo 'Upload complete!'
