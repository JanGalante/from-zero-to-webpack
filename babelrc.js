module.exports = ({ server } = {} ) => ({
  presets: [
    ['env', {
      // targets: { node: 'current' } //target a node version
      // targets: { browsers: ['> 5%', 'last 2 versions'] } //target the browser
      // targets: server ? { node: 'current' } : { browsers: ['> 5%', 'last 2 versions'] }
      targets: server ? { node: 4 } : { browsers: ['> 5%', 'last 2 versions', 'ie 11'] }
    }],

    'react',
  ],
});