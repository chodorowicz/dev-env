export HISTFILE=~/.zsh_history # Where it gets saved
export HISTSIZE=10000
export SAVEHIST=10000
setopt append_history         # Don't overwrite, append!
setopt INC_APPEND_HISTORY     # Write after each command
setopt hist_expire_dups_first # Expire duplicate entries first when trimming history.
setopt hist_fcntl_lock        # use OS file locking
setopt hist_ignore_all_dups   # Delete old recorded entry if new entry is a duplicate.
setopt hist_lex_words         # better word splitting, but more CPU heavy
setopt hist_reduce_blanks     # Remove superfluous blanks before recording entry.
setopt hist_save_no_dups      # Don't write duplicate entries in the history file.
setopt share_history          # share history between multiple shells
setopt HIST_IGNORE_SPACE      # Don't record an entry starting with a space.

# ZSH_DISABLE_COMPFIX="true"

#-- set editor
# export EDITOR=code --wait
export EDITOR="code --wait"

#-- set language
export LANG="en_US.UTF-8"

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

#-- set homebrew auto update interval
export HOMEBREW_AUTO_UPDATE_SECS="86400"
