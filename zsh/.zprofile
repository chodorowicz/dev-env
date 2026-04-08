# Added by OrbStack: command-line tools and integration
source ~/.orbstack/shell/init.zsh 2>/dev/null || :

if command -v rbenv 1>/dev/null 2>&1; then
  eval "$(rbenv init - --no-rehash zsh)"
fi

# initialize Obsidian CLI
if [[ -d "/Applications/Obsidian.app/Contents/MacOS" ]]; then
  export PATH="$PATH:/Applications/Obsidian.app/Contents/MacOS"
fi
