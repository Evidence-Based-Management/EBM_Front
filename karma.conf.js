// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      // require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml'],
    // coverageReporter: {
    //   dir: 'build/reports/coverage',
    //   reporters: [
    //     { type: 'html', subdir: 'report-html' },
    //     { type: 'lcov', subdir: 'report-lcov' }
    //   ],
    //   fixWebpackSourcePaths: true
    // },
    coverageReporter: {
      dir: 'build/reports/coverage',      
      reports: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcovonly', subdir: 'report-lcov' },
        { type: 'text-summary', subdir: 'report-text-summary' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
