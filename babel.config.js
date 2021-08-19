module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@models': './src/models',
        '@modules': './src/modules',
        '@databases': './src/databases'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
