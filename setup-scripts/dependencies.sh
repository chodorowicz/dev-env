#!/usr/bin/env bash

eval "$(/opt/homebrew/bin/brew shellenv)"

## Install all dotfiles
dotter deploy

## Install all brew packages
brew bundle --file=$HOME/Brewfile

## install deno
asdf plugin add deno https://github.com/asdf-community/asdf-deno.git
