#!/usr/bin/env bash

# install homebrew if it is not already installed
if [ -d "/opt/homebrew/bin" ]; then
  echo "Homebrew is already installed"
  eval "$(/opt/homebrew/bin/brew shellenv)"
else
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# check if dotter is installed
if ! command -v dotter &>/dev/null; then
  brew install dotter
fi

# check if 1password is installed
if ! command -v 1password &>/dev/null; then
  brew install --cask 1password
fi
