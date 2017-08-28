// Karma configuration

/*global require, module*/

var webpackTestConfig = require('./webpack.config-test.js');

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      {pattern: 'test/**/*.spec.js', watched: false}
    ],

    browsers: ['Chrome', 'Firefox'],

    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'],
      'test/**/*.spec.js': ['webpack']
    },

    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      dir: 'coverage',
      reports: ['text-summary', 'html', 'text'],
      fixWebpackSourcePaths: true
    },

    client: {
      mocha: {
        opts: 'test/mocha.opts',

        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',

        // require specific files after Mocha is initialized
        require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],

        // custom ui, defined in required file above
        ui: 'bdd-lazy-var/global',
      }
    },
    webpack: webpackTestConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
  });
};