#!/bin/bash

# '.dotfiles' locaiton in the CodeSpace
DOTFILES_DIR="$HOME/.dotfiles"

# Install Oh My Zsh (Non-interactive)
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
fi

# Install Powerlevel10k & Plugins to customize the .zsh terminal
ZSH_CUSTOM="$HOME/.oh-my-zsh/custom"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k 2>/dev/null
git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions 2>/dev/null
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting 2>/dev/null

# Make everything in myshell executable, excluding the .git directory if it exists
find "$DOTFILES_DIR/myshell" -type f -not -path '*/.*' -exec chmod +x {} +
echo "Setup complete! Restart your terminal to see changes."
