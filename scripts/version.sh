#!/bin/sh
if ! yarn version check
then
  mkdir -p .yarn/versions
  cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
  yarn version apply --all
  VERSION=$(node -p -e "require('./packages/core/package.json').version")
  git commit -am "Release $VERSION"
  yarn workspaces foreach npm publish --tag "$TRAVIS_BRANCH"
  git push -f origin HEAD:"$TRAVIS_BRANCH"
fi
