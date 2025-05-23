function gitRemoveGone() {
  git fetch -p && for branch in $(git branch -vv | grep ': gone]' | awk '{print $1}'); do git branch -D $branch; done
}

function gitClean {
  gitRemoveMerged
  gitRemoveGone
}

function updateBrew {
  brew update
  brew upgrade
  brew cleanup
  brew doctor
}

# Make directory and change into it.
function mcd() {
  mkdir -p $1
  cd $1
}

tldr() {
  open dash://tldr:${*}
}

# reload zsh environment
reload() {
  source ~/.zshrc
  source ~/.zshenv
}
