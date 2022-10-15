#/bin/sh
set -eu

# Set up ssh
echo "$SSH_KEY" > key
chmod 600 key

# Set build folder permissions
chmod -R a=rX,u+w build

# Copy files
ssh_command="ssh -v -p $SSH_PORT -i key -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
rsync -a -v --delete -e "$ssh_command" build/ $SSH_ADDRESS:public_html
