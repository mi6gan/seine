module.exports = [
  'publish',
  '--non-interactive',
  '--access=public',
  ...process.argv.slice(2),
];

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(module.exports);
}
