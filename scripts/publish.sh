#!/bin/sh
yarn config set changesetBaseRefs --json '["'"$TRAVIS_BRANCH"'"]'
yarn config set npmAuthToken "$NPM_TOKEN"

if ! yarn version check
then
  mkdir -p .yarn/versions
  cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
  yarn version apply --all
fi

if [ -z "$TRAVIS_TAG" ]
then
  git tag "$(node -p -e "require('./package.json').version")"
  git push --tags -f HEAD:"$TRAVIS_BRANCH"
  npm publish --tag "$TRAVIS_BRANCH"
fi
