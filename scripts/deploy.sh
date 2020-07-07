#!/bin/sh
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
docker build -t mi6gan/seine:"${PACKAGE_VERSION}" .
