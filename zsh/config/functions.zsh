function git-remove-gone() {
	local dry=0

	# support: git-remove-gone -dry (also --dry-run)
	if [[ "$1" == "-dry" || "$1" == "--dry-run" ]]; then
		dry=1
		echo "Dry run: will not remove any branches"
	fi

	# fetch-p will fetch all remote branches and remove any that have been deleted on the remote
	git fetch -p

	# git branch -vv - show all local branches and their upstream status
	# grep ': gone]' - filter for branches with status 'gone'
	# awk '{print $1}' extracts the local branch name
	# git branch -d $branch - delete the branch
	for branch in $(git branch -vv | grep ': gone]' | awk '{print $1}'); do
		if ((dry)); then
			echo "[dry] git branch -d -- $branch"
		else
			git branch -D $branch
		fi
	done
}

function git-clean-branches {
	git-remove-gone
}

function update-brew {
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


function github-workflows() {
    gh workflow list -L 200 --json name,id | \
        jq -r '.[] | "\(.id)\t\(.name)"' | \
        fzf --with-nth=2.. --delimiter='\t' | \
        cut -f1 | \
        xargs -I{} gh workflow view {} --webp
}
