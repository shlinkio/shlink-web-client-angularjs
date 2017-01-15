#!/usr/bin/env bash
set -e

# Install node modules
rm -rf node_modules
npm install
grunt

# Copy app directory and remove non-production stuff
cp -r app dist
rm -rf dist/app/bower_components
rm -rf dist/app/sass
rm -rf dist/app/css/.gitignore
rm -rf dist/app/js/controllers
rm -rf dist/app/js/directives
rm -rf dist/app/js/filters
rm -rf dist/app/js/services
rm -rf dist/app/js/app.js

# Bundle app distributable
rm -rf dist/shlink-web-client.zip
cd dist/app
zip -ry ../shlink-web-client.zip .
cd ../..
rm -rf dist/app

git checkout -- app/index.html
