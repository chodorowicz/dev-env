export MB_TOKEN={{metabase_ee_token}}

export JARS="$HOME/work/jars"

source "$HOME/.config/zsh/metabase.aliases.zsh"

# mbu's `goto` cannot cd this shell on its own; the function from `shell-init`
# reads the path mbu leaves in $MBU_CD_FILE and does the cd here.
if [[ -x "$MBU_DIR/mbu" ]]; then
  eval "$("$MBU_DIR/mbu" shell-init zsh)"
fi
