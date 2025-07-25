# CodeceptJS_scenarios
Technical assignment

How would you execute the test in parallel on multiple browsers?

I included the following configuration in the codecept.conf.js file to run the same tests in parallel across multiple browsers — Chrome, Firefox, and Safari:

multiple: {
   desktop: {
       browsers: [
       { browser: 'chromium' },
       { browser: 'firefox' },
       { browser: 'webkit' }
     ]
   },
 },

The "multiple" setting in the configuration file enables executing either the same tests on different browsers or different tests on the same browser in parallel.
To run tests in parallel, set "chunks": 2 inside "multiple". This means the test scenarios will be split into two separate suites and run on 2 workers simultaneously.

How would you ensure that Ads are pixel-perfect?

I implemented this for my last scenario, Scenario('Ads are pixel-perfect'), using the CodeceptJS Pixelmatch helper. It captures a screenshot and then uses the .getVisualDifferences function to compare the image with a baseline to ensure pixel-perfect accuracy.
This kind of visual testing can also be done using Applitools or Resemble.js, but Resemble.js didn’t work for me. https://codecept.io/visual/ 

How would you handle flaky tests?

I would tag flaky tests with @flaky and use retry options in configuration, such as  run-rerun, retrystep, retryFailedStep.
I found on https://codecept.io/heal.html#what-is-healin website that CodeceptJs offers healing recipes to automaticly recover from known failures, so this is great way for flaky tests.
It would be also good to clean up data between tests and to keep those test isolated.
