#!/bin/bash
# Define the source directory (where GitHub clones the dotfiles)
SOURCE_DIR=$(pwd)

# List of files/folders to symlink to home
FILES_TO_LINK=(".zshrc" ".bashrc" "mysnippets" "rojcode" "rojfile" "rojfunc" "rojgam" "rojimg" "rojlnx" "rojsec" "rojssh" "rojtxt" "rojutil")

echo "Linking dotfiles from $SOURCE_DIR to $HOME..."

for FILE in "${FILES_TO_LINK[@]}"; do
    if [ -e "$SOURCE_DIR/$FILE" ]; then
        ln -sf "$SOURCE_DIR/$FILE" "$HOME/$FILE"
        echo "✅ Linked $FILE"
    else
        echo "❌ $FILE not found, skipping"
    fi
done

# Set ZSH as the shell if available
if [ -x "$(command -v zsh)" ]; then
    sudo chsh -s $(which zsh) $(whoami)
fi
# '.dotfiles' locaiton in the CodeSpace
# Use the actual source directory instead of a hardcoded ~/.dotfiles
DOTFILES_DIR="$SOURCE_DIR"

# Install Oh My Zsh (Non-interactive)
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
fi

# Install the required packages for the utility scripts

echo "Installing dependencies..."
sudo apt update
sudo apt install -y ffmpeg curl git zsh jq wget

# Install Powerlevel10k & Plugins to customize the .zsh terminal
ZSH_CUSTOM="$HOME/.oh-my-zsh/custom"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k 2>/dev/null
git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions 2>/dev/null
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting 2>/dev/null


# Make everything in myshell executable, excluding the .git directory if it exists
find "$DOTFILES_DIR/myshell" -type f -not -path '*/.*' -exec chmod +x {} +
echo "Setup complete! Restart your terminal to see changes."
