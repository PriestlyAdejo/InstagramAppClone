module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['**/*.json'],
      rules: {
        quotes: ['error', 'double'],
        'comma-dangle': ['error', 'never'],
      },
    },
  ],
};
