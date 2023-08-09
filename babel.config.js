module.exports = {
  presets: [
    [
      'babel-preset-expo',
      {useTransformReactJSXExperimental: true},
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
