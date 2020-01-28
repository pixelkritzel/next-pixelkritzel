const path = require('path');

const withStyles = require('@webdeb/next-styles');

module.exports = withStyles({
  sass: true, // use .scss files
  modules: true, // style.(m|module).css & style.(m|module).scss for module files
  sassLoaderOptions: {
    sassOptions: {
      includePaths: ['src/styles'] // @import 'variables'; # loads (src/styles/varialbes.scss), you got it..
    }
  },
  env: {
    ...require('./.env.development.json')
  },

  webpack(config, { isServer }) {
    config.resolve.modules.push(path.resolve('./'));

    if (!isServer) {
      config.node = {
        fs: 'empty',
        path: 'empty'
      };
    }

    return config;
  }
});
