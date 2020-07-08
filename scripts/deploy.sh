#!/bin/bash
if ! [[ $(git log -1 --pretty=%B) =~ ^Release\ .+$ ]]
then
  mkdir -p .yarn/versions
  cp yarn-versions/"$TRAVIS_BRANCH".yml .yarn/versions/
  yarn version apply --all
  yarn workspaces foreach npm publish --tag "$TRAVIS_BRANCH"
  VERSION=$(node -p -e "require('./packages/core/package.json').version")
  git commit -am "Release $VERSION"
  git push -f origin HEAD:"$TRAVIS_BRANCH"
else
  TAG=mi6gan/seine:$(node -p -e "require('./packages/core/package.json').version")
  docker build -t "$TAG" .
  docker push "$TAG"
  docker tag "$TAG" mi6gan/seine:latest
  docker push mi6gan/seine:latest
  ssh "$DEPLOY_LOGIN"@"$DEPLOY_HOST" 'docker-compose pull --parallel && docker-compose up -d'
fi
