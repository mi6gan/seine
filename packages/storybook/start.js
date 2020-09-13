#!/usr/bin/env node
const spawn = require('child_process').spawn;

const child = spawn('yarn', ['start-storybook', '-c', __dirname], {
  stdio: 'inherit',
});

child.on('error', (err) => {
  // eslint-disable-next-line
  console.error(err);
});
