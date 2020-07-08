#!/bin/sh
yarn config set changesetBaseRefs --json '["'"$TRAVIS_BRANCH"'"]'
yarn config set npmAuthToken "$NPM_TOKEN"

if [ -z "$TRAVIS_TAG" ]
then
  mkdir -p .yarn/versions
  cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
  yarn version apply --all
  VERSION=$(node -p -e "require('./package.json').version")
  git commit -am "Release $VERSION"
  git push -f HEAD:"$TRAVIS_BRANCH"
  git tag "$VERSION"
  git push --tags -f HEAD:"$TRAVIS_BRANCH"
else
  npm publish --tag "$TRAVIS_BRANCH"
fi
