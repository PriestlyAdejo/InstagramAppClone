module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['json'], // Add the json plugin
  overrides: [
    {
      files: ['**/*.json'],
      processor: 'json/json', // Use the json processor
      rules: {
        'json/comma-dangle': ['error', 'never'], // Apply comma dangle rule to JSON files
        quotes: ['error', 'double'],
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
