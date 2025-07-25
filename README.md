# CodeceptJS_scenarios
Technical assignment

How would you execute the test in parallel on multiple browsers?

I included this in codecept.conf.js file, to run same tests in parallel across multiple browser - chrome, firefox, safari in parrarel.
//
multiple: {
   desktop: {
       browsers: [
       { browser: 'chromium' },
       { browser: 'firefox' },
       { browser: 'webkit' }
     ]
   },
 },
 //

"multiple" in configuration file enable to exacute same tests on different browsers or different tests on same browsers in parallel
For parallel, setting the "chunks: 2", which means it splits the test/scenarios into different suites to run on more workers

How would you ensure that Ads are pixel-perfect?

I implimented this for my last Scenario('Ads are pixel-perfect @chromiumOnly'), with the CodeceptJS pixelmatch helper. It takes screenshot and then with .getVisualDifferences function compare image to the baseline and check for pixel-perfect.
It can also be done with Applitool and Resmble.js but it didn't work.


How would you handle flaky tests?

I would tag flaky tests with @flaky and use retry options in configuration, like run-rerun, retrystep, retryFailedStep.
I found on https://codecept.io/heal.html#what-is-healin website that CodeceptJs offers healing recipes to automaticly recover from known failures. It would be also good to clean up data between tests and to keep those test isolated.
