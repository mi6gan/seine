module.exports = {
  presets: ['react-app'],
  plugins: [
    [
      'macros',
      {
        babelMacros: {
          styledComponents: {
            pure: true,
          },
        },
      },
    ],
    'inline-import-data-uri',
  ],
};
