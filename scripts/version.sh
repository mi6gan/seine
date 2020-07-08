#!/bin/sh
mkdir -p .yarn/versions
cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
yarn version apply --all
VERSION=$(node -p -e "require('./package.json').version")
git commit -am "Release $VERSION"
git tag "$VERSION"
git push --tags -f origin HEAD:"$TRAVIS_BRANCH"
