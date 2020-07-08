#!/bin/sh
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
docker build -t mi6gan/seine:"${PACKAGE_VERSION}" .
docker push mi6gan/seine:"${PACKAGE_VERSION}"
docker tag mi6gan/seine:"${PACKAGE_VERSION}" mi6gan/seine:latest
docker push mi6gan/seine:latest
