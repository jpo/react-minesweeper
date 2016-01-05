#!/bin/sh

set -e
rm -rf dist
rm -rf gh-pages
npm run dist
mkdir gh-pages
cp -R dist/* gh-pages/
git checkout gh-pages
cp -R gh-pages/* .
git add --all
git commit --amend -m "Deploy to gh-pages"
git checkout master
rm -rf dist
rm -rf gh-pages

