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
        '@controllers': './src/app/controllers',
        '@models': './src/app/models',
        '@modules': './src/app/modules',
        '@database': './src/database'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
