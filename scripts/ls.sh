printf "$(tput bold)currently linked pkgs listed below, run yarn link:lsa for pkg locations:$(tput sgr0)\n"
(
  ls -l node_modules
  ls -l node_modules/@*
) | grep ^l | grep -o "[[:alpha:]][[:alpha:]][[:alpha:]] [[:digit:]][[:digit:]].*$"
