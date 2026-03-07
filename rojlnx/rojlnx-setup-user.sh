#!/bin/bash

# Interactive user level ubuntu 24.04 setup

# Abort if an error happens
set -e

echo "Starting user specific setup..."

echo "Cloning dotfiles..."
git clone https://github.com/code2roj/dotfiles.git
echo "dotfile cloned successfully..."
echo "Installing zsh themes.."

# Install Docker engine

read -p -r "Do you want to install docker? (y/n):" user_choice
    if [[ "$user_choice" =~ ^[Yy]$ ]]; then
    "$HOME/dotfiles/rojlnx/rojlnx-install-headless-docker.sh"
    echo "Installed docker engine successfully"
fi

# Install nodejs 20+
read -p -r "Do you want to install node? (y/n):" user_choice
    if [[ "$user_choice" =~ ^[Yy]$ ]]; then
    "$HOME/dotfiles/rojlnx/rojlnx-install-node.sh"
    echo "Installed nodejs successfully"
    nodejs -v
fi

# Install mongodb
read -p -r "Do you want to install mogodb? (y/n):" user_choice
    if [[ "$user_choice" =~ ^[Yy]$ ]]; then
    "$HOME/dotfiles/rojlnx/rojlnx-install-mogodb.sh"
    echo "Installed mogodb successfully"
fi


