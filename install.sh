#!/bin/bash
SOURCE_DIR=$(pwd)
MYSHELL_HOME="$HOME/myshell"

echo "Linking dotfiles from $SOURCE_DIR to $HOME..."

# 1. Create the target directory and link configs
mkdir -p "$MYSHELL_HOME"
ln -sf "$SOURCE_DIR/.zshrc" "$HOME/.zshrc"
ln -sf "$SOURCE_DIR/.bashrc" "$HOME/.bashrc"
ln -sf "$SOURCE_DIR/.bash_aliases" "$HOME/.bash_aliases"


for DIR in "mysnippets" "rojcode" "rojfile" "rojfunc" "rojgam" "rojimg" "rojlnx" "rojsec" "rojssh" "rojtxt" "rojutil"; do
    if [ -d "$SOURCE_DIR/$DIR" ]; then
        ln -sf "$SOURCE_DIR/$DIR" "$MYSHELL_HOME/$DIR"
        echo "✅ Linked $DIR into ~/myshell/"
    fi
done

# 3. System Updates and Dependencies
echo "Installing dependencies..."
sudo apt update && sudo apt install -y ffmpeg curl git zsh jq wget

# 4. Install Oh My Zsh (Non-interactive)
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
fi

# 5. Install Powerlevel10k & Plugins
ZSH_CUSTOM="$HOME/.oh-my-zsh/custom"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k 2>/dev/null
git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions 2>/dev/null
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting 2>/dev/null

# 6. Set ZSH as shell and make scripts executable
if [ -x "$(command -v zsh)" ]; then
    sudo chsh -s $(which zsh) $(whoami)
fi

find "$MYSHELL_HOME" -type f -not -path '*/.*' -exec chmod +x {} +
echo "Setup complete! Restart your terminal to see changes."