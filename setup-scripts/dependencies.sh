#!/usr/bin/env bash

## Install all dotfiles
dotter deploy

## Install all brew packages
brew bundle --file=$HOME/Brewfile
