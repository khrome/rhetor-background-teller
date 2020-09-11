module.exports = {
    entry: {
        main: './background-teller.js'
    },
    externals: {
      'story-teller': 'StoryTeller'
  },
    node: {
      fs: 'empty',
      tls: 'empty',
      net: 'empty'
    }
};
