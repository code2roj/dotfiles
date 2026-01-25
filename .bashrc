# Non-interactive check
case $- in
    *i*) ;;
      *) return;;
esac

# History and Globbing
HISTCONTROL=ignoreboth
shopt -s histappend checkwinsize
HISTSIZE=1000
HISTFILESIZE=2000

# Prompt and Colors
force_color_prompt=yes
if [ -x /usr/bin/dircolors ]; then
    eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    alias grep='grep --color=auto'
fi

alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Dynamic Utility Paths
# This searches for your scripts within the cloned dotfiles folder automatically
DOTFILES_DIR="$HOME/.dotfiles" 
for sub in myshell/*; do
    [ -d "$DOTFILES_DIR/$sub" ] && export PATH="$PATH:$DOTFILES_DIR/$sub"
done

[[ -f ~/.bash_aliases ]] && . ~/.bash_aliases
