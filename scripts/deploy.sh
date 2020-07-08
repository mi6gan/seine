#!/bin/sh
TAG=mi6gan/seine:"$(node -p -e "require('./packages/core/package.json').version")"
docker build -t "$TAG" .
docker push "$TAG"
docker tag "$TAG" mi6gan/seine:latest
docker push mi6gan/seine:latest
