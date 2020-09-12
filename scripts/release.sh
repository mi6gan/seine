#!/bin/bash
mkdir -p .yarn/versions
echo -e \
releases:'\n'\
'  '@seine/charts: patch'\n'\
'  '@seine/charts-editor: patch'\n'\
'  '@seine/content: patch'\n'\
'  '@seine/core: patch'\n'\
'  '@seine/draft: patch'\n'\
'  '@seine/draft-editor: patch'\n'\
'  '@seine/editor: patch'\n'\
'  '@seine/styles: patch'\n'\
'  '@seine/tables: patch'\n'\
'  '@seine/tables-editor: patch'\n'\
'  '@seine/testbox: patch'\n'\
'  '@seine/ui: patch':w\n'\
'  'react-color.macro: patch'\n'\
undecided:'\n'\
'  '- seine\
> .yarn/versions/release.yml
yarn workspaces foreach -t --exclude seine version patch
VERSION=$(node -p -e "require('./packages/core/package.json').version")
git commit -am "Release $VERSION"
yarn workspaces foreach -t --exclude seine exec npm publish
# git push -f origin HEAD:latest
