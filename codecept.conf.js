const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://martin-kregar.celtra.com/explorer/1df8d540',
      show: true,
      waitForNavigation: "networkidle0",
    },
    PixelmatchHelper: {
        require: "codeceptjs-pixelmatchhelper",
        dirExpected:  "./tests/screenshots/base/",   
        dirDiff:      "./tests/screenshots/diff/",    
    },
  },
   multiple: {
   desktop: {
       browsers: [
       { browser: 'chromium' },
       { browser: 'firefox' },
       { browser: 'webkit' }
     ]
   },
 },
 plugins: {
    allure: {
      enabled: true,
      require: 'allure-codeceptjs',
      //outputDir: './output/allure-report',
    },
  },
  include: {
    I: './steps_file.js'
  },
  name: 'CodeceptJS'
}