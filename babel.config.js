module.exports = {
  presets:
    process.env.NODE_ENV === 'development'
      ? ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow']
      : ['react-app'],
  plugins: ['macros', 'inline-import-data-uri'],
};
