##!/usr/bin/env bash

### Dock

# autohide dock
# https://macos-defaults.com/dock/autohide.html
defaults write com.apple.dock "autohide" -bool "true"

# https://macos-defaults.com/dock/mineffect.html
defaults write com.apple.dock "mineffect" -string "scale"

killall Dock

### Finder
# https://macos-defaults.com/finder/appleshowallfiles.html
defaults write com.apple.finder "AppleShowAllFiles" -bool "true"
killall Finder

### Trackpad

# Three finger drag
# https://macos-defaults.com/trackpad/trackpadthreefingerdrag.html
defaults write com.apple.AppleMultitouchTrackpad "TrackpadThreeFingerDrag" -bool true
defaults write com.apple.AppleMultitouchTrackpad "Dragging" -bool false

# Tap to click
defaults -currentHost write NSGlobalDomain com.apple.mouse.tapBehavior -int 1
defaults write com.apple.AppleMultitouchTrackpad "Clicking" -bool true

# Increase tracking speed
defaults write -g com.apple.trackpad.scaling -float 2.8

# Activate new settings
/System/Library/PrivateFrameworks/SystemAdministration.framework/Resources/activateSettings -u