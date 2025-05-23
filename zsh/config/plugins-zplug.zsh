export ZPLUG_HOME=$HOMEBREW_PREFIX/opt/zplug
source $ZPLUG_HOME/init.zsh

# zplug "lukechilds/zsh-nvm"

zplug "zsh-users/zsh-autosuggestions"
# if zplug check zsh-users/zsh-autosuggestions; then
#   Add history-substring-search-* widgets to list of widgets that clear the autosuggestion
#   ZSH_AUTOSUGGEST_CLEAR_WIDGETS+=(history-substring-search-up history-substring-search-down accept-line)

#   Remove *-line-or-history widgets from list of widgets that clear the autosuggestion to avoid conflict with history-substring-search-* widgets
#   ZSH_AUTOSUGGEST_CLEAR_WIDGETS=("${(@)ZSH_AUTOSUGGEST_CLEAR_WIDGETS:#(up|down)-line-or-history}")
# fi

zplug "zsh-users/zsh-syntax-highlighting"

zplug "rupa/z", use:z.sh

# k
# Directory listings for zsh with git features.
# https://github.com/supercrabtree/k
zplug 'supercrabtree/k'

# alias-tips
# Reminds you of aliases you have already.
# https://github.com/djui/alias-tips
zplug 'djui/alias-tips'

# 🐢 seems to take quite a bit to load, around 1 second
# zplug "felixr/docker-zsh-completion"

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# source "$HOME/dotfiles/nvm/auto-load-node.zsh"

# use fzf when searching through suggestions
zplug "Aloxaf/fzf-tab"

zplug "g-plane/pnpm-shell-completion", hook-build:"./zplug.zsh", defer:2

if ! zplug check --verbose; then
    printf "Install? [y/N]: "
    if read -q; then
        echo; zplug install
    fi
fi

# zplug load --verbose
zplug load

# Removed

# zplug "psprint/zsh-navigation-tools"
# autoload znt-history-widget
# zle -N znt-history-widget
# bindkey "^R" znt-history-widget

# zplug "zsh-users/zsh-history-substring-search"
# if zplug check zsh-users/zsh-history-substring-search; then
#   zmodload zsh/terminfo
#   bindkey "$terminfo[cuu1]" history-substring-search-up
#   bindkey "$terminfo[cud1]" history-substring-search-down
# fi
