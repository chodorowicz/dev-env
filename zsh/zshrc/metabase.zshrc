export MB_TOKEN={{metabase_ee_token}}

# Java home
if [ -f $HOME/.asdf/plugins/java/set-java-home.zsh ]; then
    . $HOME/.asdf/plugins/java/set-java-home.zsh
fi

export JARS="$HOME/work/jars"

source "$HOME/.config/zsh/metabase.aliases.zsh"