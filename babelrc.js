module.exports = {
  presets: [
    ['env', {
      // targets: { node: 'current' } //target a node version
      targets: { browsers: ['> 5%', 'last 2 versions'] } //target the browser
    }],

    'react', // Add this
  ],
}