#!/usr/bin/env bash

# BASH_SOURCE[0] has the path of the script that is being executed
current_dir=$(dirname "$(realpath "${BASH_SOURCE[0]}")")
# get one level up
dev_env_dir=$(dirname "$current_dir")

pushd $dev_env_dir/karabiner

# install karabiner.ts modifications
deno run --allow-env --allow-read --allow-write $dev_env_dir/karabiner/karabiner.ts

popd
