script_kit_dir=$HOME/.kenv/scripts

function init_script_kit() {
  if [ ! -d $script_kit_dir ]; then
    mkdir -p $script_kit_dir
  fi

  if [ ! -d $script_kit_dir/copy-markdown-url-and-title ]; then
    echo "Cloning copy-markdown-url-and-title"
    git clone --filter=blob:none --sparse git@github.com:chodorowicz/copy-markdown-url-and-title.git $script_kit_dir/copy-markdown-url-and-title
  fi

  if [ -d $script_kit_dir/copy-markdown-url-and-title ]; then
    pushd $script_kit_dir/copy-markdown-url-and-title
    git sparse-checkout set "script-kit/scripts"
    git checkout script-kit-copy-url-title
    git pull
  fi
}

function move_script_kit_scripts() {
  pushd $script_kit_dir/copy-markdown-url-and-title
  cp -r "$script_kit_dir/copy-markdown-url-and-title/script-kit/scripts"/* "$script_kit_dir/"
  popd
}

function move_script_kit_scripts_from_source() {
  pushd $script_kit_dir/copy-markdown-url-and-title
  cp -r "$HOME/personal/copy-markdown-url-and-title/script-kit/scripts"/* "$script_kit_dir/"
  popd
}

init_script_kit
move_script_kit_scripts
# move_script_kit_scripts_from_source
