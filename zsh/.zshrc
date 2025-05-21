# forward-word and backward-word to stop at slashes too
#  can also be edited using select-word-style
WORDCHARS=${WORDCHARS//[\/-]/}.

source "$HOME/dotfiles/zsh/config.zsh"

# zplug
source "$HOME/dotfiles/zsh/plugins/plugins-zplug.zsh"

source "$HOME/dotfiles/zsh/functions.zsh"
source "$HOME/dotfiles/zsh/aliases.zsh"

if [ -f ~/.fzf.zsh ]; then
	source "$HOME/.fzf.zsh"
else
	echo "fzf.zsh not found, please install fzf and keybindings"
	$(brew --prefix)/opt/fzf/install
fi

source "$HOME/dotfiles/zsh/functions/kill-process.zsh"
source "$HOME/dotfiles/zsh/functions/find-path.zsh"
source "$HOME/dotfiles/zsh/functions/better-mv.zsh"
source "$HOME/dotfiles/zsh/functions/wait-for-docker.zsh"

# Starship
export STARSHIP_CONFIG="$HOME/dotfiles/starship.toml"
eval "$(starship init zsh)"

# nvm
# source "$HOME/dotfiles/zsh/custom-config/nvm.zsh"

# pnpm
export PNPM_HOME="$HOME/Library/pnpm"
case ":$PATH:" in
*":$PNPM_HOME:"*) ;;
*) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end

# [Webstorm not inferring nodejs path – IDEs Support (IntelliJ Platform) | JetBrains](https://intellij-support.jetbrains.com/hc/en-us/community/posts/4680655116434-Webstorm-not-inferring-nodejs-path)
# test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"
if [ -n "${ITERM_SESSION_ID}" ] && [ -e "${HOME}/.iterm2_shell_integration.zsh" ]; then
	source "${HOME}/.iterm2_shell_integration.zsh"
fi

# fnm
eval "$(fnm env --use-on-cd --shell zsh)"
eval "$(fnm env --corepack-enabled --shell zsh)"
eval "$(fnm env --version-file-strategy=recursive --shell zsh)"

if [ -f ~/.deno/env ]; then
	. "$HOME/.deno/env"
fi
