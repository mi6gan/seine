#!/bin/sh
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
if yarn version check
then
  yarn npm publish --tag "$TRAVIS_BRANCH"
else
  mkdir -p .yarn/versions
  cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
  yarn version apply --all
  git commit -am "Release $PACKAGE_VERSION"
  git push -f origin HEAD:"$TRAVIS_BRANCH"
fi
