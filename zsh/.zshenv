# As it happens, El Capitan introduced a global Zsh profile at /etc/zprofile that calls /usr/libexec/path_helper, a utility which adds system directories to $PATH, reorders it, and then removes duplicates. Our customizations are being overwritten because Zsh calls /etc/zprofile after ~/.zshenv.
#   https://mattprice.me/2015/zsh-path-issues-osx-el-capitan/
setopt NO_GLOBAL_RCS

export PATH="/usr/local/bin":$PATH
export PATH="/usr/local/sbin":$PATH
export PATH="$HOME/local/sbin":$PATH
export PATH="$HOME/.local/bin":$PATH
export PATH="$HOME/.console-ninja/.bin":$PATH

# search for folders in home directory
#   https://mike.place/2017/fzf-fd/
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

export NPM_CONFIG_GLOBALCONFIG="$HOME/global.npmrc"

# pyenv initialisation - it inserts shims into path
if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi

export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120

cargo="$HOME/.cargo/env"
[ -f "$cargo" ] && . "$HOME/.cargo/env"
export PATH=$PATH:"$HOME/.cargo/bin"

if [[ $(uname -m) == 'arm64' ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi
