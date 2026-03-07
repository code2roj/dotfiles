#!/usr/bin/env bash
# ^ IMPORTANT: make sure this is the very first line, no BOM, no spaces

# Interactive user-level Ubuntu 24.04 setup
# Do NOT exit on error; continue through all steps
set -u

echo "Starting user specific setup..."
sudo apt install unzip
sudo apt install wget
sudo apt install curl
sudo apt install zip
sudo apt install fontconfig

log_step() {
  local step="$1"
  shift
  echo "=== [$step] starting ==="
  if "$@"; then
    echo "=== [$step] OK ==="
  else
    local rc=$?
    echo "=== [$step] FAILED (exit code $rc), continuing... ===" >&2
  fi
  echo
}

# POSIX-ish prompt helper: avoids 'read -p' so it works even in /bin/sh
ask_yn() {
  # $1 = question
  local answer
  printf "%s " "$1"
  read -r answer || return 1
  if printf '%s' "$answer" | grep -qiE '^y'; then
    return 0
  fi
  return 1
}

# Ensure git is available
log_step "install-git-if-missing" bash -c '
  if ! command -v git >/dev/null 2>&1; then
    sudo apt-get update -y && sudo apt-get install -y git
  fi
'

DOTFILES_DIR="$HOME/dotfiles"

# Clone or update dotfiles
log_step "clone-or-update-dotfiles" bash -c "
  if [ -d \"$DOTFILES_DIR/.git\" ]; then
    git -C \"$DOTFILES_DIR\" pull --ff-only
  else
    git clone https://github.com/code2roj/dotfiles.git \"$DOTFILES_DIR\"
  fi
"

run_dotfile_script() {
  local script_path="$DOTFILES_DIR/rojlnx/$1"
  if [ ! -x "$script_path" ]; then
    if [ -f "$script_path" ]; then
      chmod +x "$script_path" || {
        echo "Cannot chmod +x $script_path" >&2
        return 1
      }
    else
      echo "Script not found: $script_path" >&2
      return 1
    fi
  fi
  "$script_path"
}

echo

# Install Docker engine
if ask_yn "Do you want to install Docker? (y/n):"; then
  log_step "install-docker" run_dotfile_script "rojlnx-install-headless-docker.sh"
fi

echo

# Install Node.js 20+
if ask_yn "Do you want to install Node.js (20+)? (y/n):"; then
  log_step "install-node" run_dotfile_script "rojlnx-install-node.sh"

  log_step "check-node-version" bash -c '
    if command -v node >/dev/null 2>&1; then
      node -v
    elif command -v nodejs >/dev/null 2>&1; then
      nodejs -v
    else
      echo "Warning: node executable not found on PATH after install." >&2
      exit 1
    fi
  '
fi

echo

# Install MongoDB
if ask_yn "Do you want to install MongoDB? (y/n):"; then
  log_step "install-mongodb" run_dotfile_script "rojlnx-install-mogodb.sh"
fi

echo

# Install the ZSH theme
if ask_yn "Do you want to install ZSH themes? (y/n):"; then
  log_step "install-zsh-themes" run_dotfile_script "rojlnx-setupzsh.sh"
fi

echo "All done (some steps may have failed; check logs above)."
