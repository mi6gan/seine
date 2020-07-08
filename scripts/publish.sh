#!/bin/sh
yarn config set changesetBaseRefs --json '["'"$TRAVIS_BRANCH"'"]'
yarn config set npmAuthToken "$NPM_TOKEN"

if [ -z "$TRAVIS_TAG" ]
then
  npm publish --tag "$TRAVIS_BRANCH"
  mkdir -p .yarn/versions
  cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
  yarn version apply --all
  git tag "$(node -p -e "require('./package.json').version")"
  git push --tags -f HEAD:"$TRAVIS_BRANCH"
fi
