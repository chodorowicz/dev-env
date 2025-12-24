#!/usr/bin/env bash

## Install Mise https://mise.jdx.dev/
curl https://mise.run | sh

eval "$(/opt/homebrew/bin/brew shellenv)"

## Install all dotfiles
dotter deploy

## Install all brew packages
brew bundle --file=$HOME/Brewfile

## Install raycast scripts
raycast_scripts_dir=$HOME/.config/raycast-scripts
if [ ! -d $raycast_scripts_dir ]; then
    mkdir -p $raycast_scripts_dir
fi

if [ ! -d $raycast_scripts_dir/copy-markdown-url-and-title ]; then
    git clone git@github.com:chodorowicz/copy-markdown-url-and-title.git $raycast_scripts_dir/copy-markdown-url-and-title
fi

pushd $raycast_scripts_dir/copy-markdown-url-and-title
git pull
popd





