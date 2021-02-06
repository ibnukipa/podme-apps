module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          hooks: './src/hooks',
          routes: './src/routes',
          screens: './src/screens',
          states: './src/states',
          utils: './src/utils',
        },
      },
    ],
  ],
};
