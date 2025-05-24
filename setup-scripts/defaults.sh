##!/usr/bin/env bash

# Dock
# autohide dock
# https://macos-defaults.com/dock/autohide.html
defaults write com.apple.dock "autohide" -bool "true"

# https://macos-defaults.com/dock/mineffect.html
defaults write com.apple.dock "mineffect" -string "scale"

killall Dock

## Finder
# https://macos-defaults.com/finder/appleshowallfiles.html
defaults write com.apple.finder "AppleShowAllFiles" -bool "true"
killall Finder

# Trackpad
# https://macos-defaults.com/trackpad/trackpadthreefingerdrag.html
defaults write com.apple.AppleMultitouchTrackpad "TrackpadThreeFingerDrag" -bool "true"
