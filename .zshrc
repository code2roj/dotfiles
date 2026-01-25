# Enable Powerlevel10k instant prompt
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
source "$ZSH/oh-my-zsh.sh"

# Core Shell Behavior
setopt HIST_IGNORE_DUPS HIST_IGNORE_SPACE APPEND_HISTORY
HISTSIZE=1000
SAVEHIST=2000
setopt EXTENDED_GLOB

# Color and Aliases
export GCC_COLORS='error=01;31:warning=01;35:note=01;36:caret=01;32:locus=01:quote=01'
[ -x /usr/bin/dircolors ] && eval "$(dircolors -b)"
alias ls='ls --color=auto'
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'

# Source common aliases if they exist
[[ -f ~/.bash_aliases ]] && source ~/.bash_aliases
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
