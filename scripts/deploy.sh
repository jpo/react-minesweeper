#!/bin/sh

set -e
rm -rf build
npm run build
git checkout gh-pages
cp -R build/* .
git add --all
git commit --amend -m "Deploy to Github Pages"
git checkout master
