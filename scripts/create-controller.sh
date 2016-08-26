#!/usr/bin/env bash
set -e

if [ "$#" -ne 1 ]; then
  echo "Usage:" >&2
  echo "   $0 controllerName [moduleName]" >&2
  exit 1
fi

if [ -z "$2" ]; then
    module='shlink'
else
    module=$2
fi
controller=$1

# Change to project root
git_root=$(GIT_EDITOR=echo git config -e)
git_root=${git_root%/*}
cd "$git_root"/..

# Replace the name of the controller and the module inside the template
controllerTemplate=$(<scripts/templates/controller-template.txt)
content=${controllerTemplate//"%controller%"/$controller}
content=${content//"%module%"/$module}

# create controller file
controllerFile=app/js/controllers/${controller}.js
touch $controllerFile
echo "${content}" > $controllerFile
