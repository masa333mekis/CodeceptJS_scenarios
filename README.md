# CodeceptJS_scenarios
Automate scenarios using the CodeceptJS framework

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



