#!/bin/bash
if ! [[ $(git log -1 --pretty=%B) =~ ^Release\ .+$ ]]
then
  mkdir -p .yarn/versions
  cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
  yarn version apply --all
  git commit -am "Release $VERSION"
  VERSION=$(node -p -e "require('./packages/core/package.json').version")
  git push -f origin HEAD:"$TRAVIS_BRANCH"
  yarn workspaces foreach npm publish --tag "$TRAVIS_BRANCH"
fi
