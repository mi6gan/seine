module.exports = {
  extends: [
    'react-app',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
  ],
  rules: {
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-unresolved': 0,
    'no-console': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-description': ['warn', { descriptionStyle: 'tag' }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'styled-components',
            message: 'Please import from styled-components/macro.',
          },
        ],
        patterns: ['!styled-components/macro'],
      },
    ],
  },
  settings: {
    'import/ignore': ['styled-components/*'],
  },
};
