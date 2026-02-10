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

function load-env() {
  local env_name=${1:-}
  local env_file
  
  if [ -z "$env_name" ]; then
    env_file=".env"
  elif [[ "$env_name" == .* ]]; then
    # If name starts with a dot, use as-is (e.g., .env.local)
    env_file="$env_name"
  else
    # Otherwise, prepend .env. (e.g., "local" -> ".env.local")
    env_file=".env.$env_name"
  fi
  
  [ -f "$env_file" ] && set -a && source "$env_file" && set +a
}