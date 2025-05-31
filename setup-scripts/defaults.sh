##!/usr/bin/env bash

## Sounds

# Disable audio feedback
defaults write com.apple.sound.beep.feedback -bool false

### Dock

# autohide dock
# https://macos-defaults.com/dock/autohide.html
defaults write com.apple.dock "autohide" -bool "true"

# https://macos-defaults.com/dock/mineffect.html
defaults write com.apple.dock "mineffect" -string "scale"

killall Dock

### Finder

# Show all files
# https://macos-defaults.com/finder/appleshowallfiles.html
defaults write com.apple.finder "AppleShowAllFiles" -bool "true"
killall Finder

# Show all filename extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Disable the warning when changing a file extension
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false

# Avoid creating .DS_Store files on network or USB volumes
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# Use list view in all Finder windows by default
# https://macos-defaults.com/finder/fxpreferredviewstyle.html
# Four-letter codes for the other view modes: `icnv`, `clmv`, `glyv`
defaults write com.apple.finder FXPreferredViewStyle -string "Nlsv"

### Trackpad

# Three finger drag
# https://macos-defaults.com/trackpad/trackpadthreefingerdrag.html
defaults write com.apple.AppleMultitouchTrackpad "TrackpadThreeFingerDrag" -bool true
defaults write com.apple.AppleMultitouchTrackpad "Dragging" -bool false

# Tap to click
defaults -currentHost write NSGlobalDomain com.apple.mouse.tapBehavior -int 1
defaults write com.apple.AppleMultitouchTrackpad "Clicking" -bool true

# Increase tracking speed
# https://www.reddit.com/r/macbook/comments/1bytv0r/exceeding_the_trackpad_speed_slider/
# this setting is stored in ~/Library/Preferences/.GlobalPreferences.plist
# view with: plutil -p ~/Library/Preferences/.GlobalPreferences.plist
defaults write -g com.apple.trackpad.scaling -float 2.8

### Autocorrection

# Disable automatic capitalization
defaults write NSGlobalDomain NSAutomaticCapitalizationEnabled -bool false

# Disable smart dashes
defaults write NSGlobalDomain NSAutomaticDashSubstitutionEnabled -bool false

# Disable automatic period substitution
defaults write NSGlobalDomain NSAutomaticPeriodSubstitutionEnabled -bool false

# Disable smart quotes
defaults write NSGlobalDomain NSAutomaticQuoteSubstitutionEnabled -bool false

# Disable auto-correct
defaults write NSGlobalDomain NSAutomaticSpellingCorrectionEnabled -bool false

## Menubar  

# Show Bluetooth in menubar
# https://www.hexnode.com/mobile-device-management/help/script-to-show-bluetooth-menu-on-status-bar-of-macos-devices/
defaults write com.apple.controlcenter.plist Bluetooth -int 18 

## Activate new settings
/System/Library/PrivateFrameworks/SystemAdministration.framework/Resources/activateSettings -u


