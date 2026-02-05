#!/bin/bash

# Abbrechen bei Fehlern
set -e

# Dynamischer Pfad zum Skript-Ordner (wichtig für die Paketlisten)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting rojlnx setup..."

# 1. Update system packages
if command -v apt &> /dev/null; then
    echo "Updating system packages using apt..."
    sudo apt update && sudo apt upgrade -y
elif command -v apk &> /dev/null; then
    echo "Updating system packages using apk..."
    sudo apk update && sudo apk upgrade
elif command -v brew &> /dev/null; then
    echo "Updating system packages using brew..."
    brew update && brew upgrade
fi

# 2. Rename the hostname
read -p "Do you want to rename the hostname? (y/n): " rename_choice
if [[ "$rename_choice" =~ ^[Yy]$ ]]; then
    read -p "Enter the new hostname: " new_hostname
    sudo hostnamectl set-hostname "$new_hostname"
    # Update /etc/hosts to prevent sudo lag
    sudo sed -i "s/127.0.1.1.*/127.0.1.1 $new_hostname/" /etc/hosts
    echo "Hostname renamed to '$new_hostname'."
fi

# 3. Create default user
read -p "Should the default user be changed? (y/n):" default_user_choice
    if [[ "$default_user_choice" =~ ^[Yy]$ ]]; then
    read -p "Enter the default user's name" DEFAULT_USER
    echo "Creating user '$DEFAULT_USER'..."

    sudo useradd -m -s /bin/bash "$DEFAULT_USER"
    echo "Please set a password for '$DEFAULT_USER':"
    sudo passwd "$DEFAULT_USER"
fi

# 4. Permissions (Sudo/Wheel)
if command -v apt &> /dev/null; then
    sudo usermod -aG sudo "$DEFAULT_USER"
else
    # Für Alpine/Arch/etc.
    sudo groupadd -f wheel
    sudo usermod -aG wheel "$DEFAULT_USER"
fi

# Log into the default user
su "$DEFAULT_USER"

# Clone the dotfiles repo
git clone https://github.com/code2roj/dotfiles.git

# Print success
echo "Rojlnx initial setup completed."
