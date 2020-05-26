printf "$(tput bold)linkable / registered pkgs:$(tput sgr0)\n"
DIRECTORY=~/.config/yarn/link/
if [ ! -d "$DIRECTORY" ]; then
  DIRECTORY=~/AppData/Local/Yarn/Data/link
fi

ls -la $DIRECTORY | grep ^l | grep -o "[[:alpha:]][[:alpha:]][[:alpha:]] [[:digit:]][[:digit:]].*$"
