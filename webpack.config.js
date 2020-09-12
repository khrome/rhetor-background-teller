module.exports = {
    entry: {
        main: './background-teller.js'
    },
    externals: {
      'rhetor': 'Rhetor'
  },
    node: {
      fs: 'empty',
      tls: 'empty',
      net: 'empty'
    }
};
