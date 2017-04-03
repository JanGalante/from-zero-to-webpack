module.exports = ({ server } = {} ) => ({
  presets: [
    ['env', {
      // targets: { node: 'current' } //target a node version
      // targets: { browsers: ['> 5%', 'last 2 versions'] } //target the browser
      targets: server ? { node: 'current' } : { browsers: ['> 5%', 'last 2 versions'] },
      modules: false // To enables Webpacks "tree shaking" we just need to tell Babel not to transform javascript modules
    }],

    'react',
  ],
});