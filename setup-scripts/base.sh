#!/usr/bin/env bash

# install homebrew if it is not already installed
if [ -d "/opt/homebrew/bin" ]; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

eval "$(/opt/homebrew/bin/brew shellenv)"

brew install dotter
brew install --cask 1password
