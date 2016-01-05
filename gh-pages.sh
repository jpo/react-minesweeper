#!/bin/sh

set -e
rm -rf dist
npm run dist
git checkout gh-pages
cp -R dist/* .
git add --all
git commit --amend -m "Deploy to gh-pages"
git checkout master
rm -rf dist
