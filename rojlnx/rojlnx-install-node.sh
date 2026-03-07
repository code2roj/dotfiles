#!/usr/bin/env bash
set -euo pipefail

NODE_MAJOR=20

echo "==> Updating package index..."
sudo apt-get update -y

echo "==> Installing prerequisites..."
sudo apt-get install -y ca-certificates curl gnupg

echo "==> Adding NodeSource APT repository for Node.js ${NODE_MAJOR}.x..."

# Create keyrings directory if it doesn't exist
sudo mkdir -p /etc/apt/keyrings

# Download and store the NodeSource GPG key
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
  | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Add NodeSource repository
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] \
https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" \
  | sudo tee /etc/apt/sources.list.d/nodesource.list > /dev/null

echo "==> Updating package index (NodeSource added)..."
sudo apt-get update -y

echo "==> Installing Node.js ${NODE_MAJOR}.x..."
sudo apt-get install -y nodejs

echo "==> Verifying installation..."
node -v
npm -v

echo "==> Node.js ${NODE_MAJOR}.x installation completed."
