'use strict';

const os = require('os');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
        'content.js', // injected here instead of via extension.
        'test/*.js',
    ],
    exclude: [],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    customLaunchers: {
      chrome: {
        base: 'Chrome',
        flags: [
            '--use-fake-device-for-media-stream',
            '--use-fake-ui-for-media-stream',
            '--headless', '--disable-gpu', '--remote-debugging-port=9222',
            '--no-sandbox',
        ]
      },
      firefox: {
        base: 'Firefox',
        prefs: {
          'media.navigator.streams.fake': true,
          'media.navigator.permission.disabled': true
        },
        flags: ['-headless']
      },
    },
    singleRun: true,
    concurrency: Infinity,
    browsers: process.env.BROWSER ? [process.env.BROWSER] : ['chrome', 'firefox'],
  });
};
