#!/bin/sh
mkdir -p .yarn/versions
cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
yarn version apply --all
VERSION=$(node -p -e "require('./package.json').version")
git tag -am "Release $VERSION" "$VERSION"
git push --follow-tags origin HEAD:"$TRAVIS_BRANCH"
