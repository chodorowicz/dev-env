#!/usr/bin/env bash

# install homebrew if it is not already installed
if ! command -v brew &>/dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

brew install dotter

## Install all dotfiles
dotter deploy

## Install all brew packages
brew bundle --file=$HOME/Brewfile
