Feature('Scenarios for Creatives');

const assert = require('assert')

Scenario('Creative filtering', async  ({ I }) => {

    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    //all three are loaded
    I.waitNumberOfVisibleElements('[data-testilda-id="creative-variant-unit"]', 3);
    //I.seeNumberOfVisibleElements('.creative-variant', 3);
    I.seeNumberOfVisibleElements('[data-testilda-id="creative-variant-unit"]', 3);
    
    //different method
    await eachElement('Check if all creatives are visible', '.creative-variant', async el => {
        assert(await el.isVisible())
    })
    
    //all three are visible
    //I.see('Expandable', '.creative-variant');
    I.see('Expandable', '[data-testilda-id="creative-variant-unit"]');
    //I.see('Interstitial', '.creative-variant');
    I.see('Interstitial', '[data-testilda-id="creative-variant-unit"]');
    //I.see('Banner', '.creative-variant');
    I.see('Banner', '[data-testilda-id="creative-variant-unit"]');
   
    //Click on Add button
    I.click('[data-testilda-id="add-filter-button"]');

    //Click on Format
    I.click('//ul[contains(@class, "filter-new__options")]//li[.//span[text()="Format"]]');
    //I.click(locate('li.filter-new__options--action').withText('Format'));
   
    //Click and choose "Universal Banner
    //I.click('Universal Banner', '.filter-component');
    I.click('[data-id="universal-banner"]');

    //Click Apply
    I.click('[data-testilda-id="dialogButtonNext"]');

    //Confirm just one creative is displayed - Banner
    I.seeNumberOfVisibleElements('[data-testilda-id="creative-variant-unit"]', 1);
    //I.see('Banner', '.creative-variant');
    I.see('Banner', '[data-testilda-id="creative-variant-unit"]');

    //Click on Add button
    I.click('[data-testilda-id="add-filter-button"]');

    //Click on Size
    I.click('//ul[contains(@class, "filter-new__options")]//li[.//span[text()="Size"]]'); // ni css data atributa
    
    //Click and select 320x50
    //I.click('[data-id="320x50"]');
    I.click('//div[contains(@class, "filter-component")]//span[text()="320×50"]');

    //Click Apply
    I.click('[data-testilda-id="dialogButtonNext"]');

    //Confirm that no creative is displayed
    I.dontSeeElement(' [data-testilda-id="creative-variant-unit"]');
    I.see('NO VARIANTS', '.creative-variants-list-wrapper');

    //Click Reset button
    I.click('[data-testilda-id="filters-reset-button"]'); //ker obstaja data-testiIlda-id

    //Confirm that all three creatives are visible
    I.waitNumberOfVisibleElements('[data-testilda-id="creative-variant-unit"]', 3);
    I.seeNumberOfVisibleElements('[data-testilda-id="creative-variant-unit"]', 3);
});

Scenario('Creative sorting ', async ({ I }) => {

    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');
   
    //Wait for rendering
    I.waitForElement('[data-testilda-id="defaultListItem"]', 2);

    //Confirm that the default sorting is Last modified creative
    I.see('Last modified creative', '[data-testilda-id="defaultListItem"]');
   
    //Check sequence of displayed creatives
    //const sequenceLastModified = await I.grabAttributeFromAll('.middle-ellipsis__text', 'title');
    //const sequenceLastModified = await I.grabTextFromAll('[data-testilda-id="creative-variant-unit"] .middle-ellipsis__text');
    
    const sequenceLastModified = await I.grabTextFromAll('.middle-ellipsis__text');
    const expectedOrderDate = ['Expandable', 'Interstitial', 'Banner'];
    assert.deepStrictEqual(sequenceLastModified,  expectedOrderDate, 'Creative variants are not in right date order');
    
    //Click on Sorting element to open dropdown
    I.click('.selectbox__select-row--selected');
    //I.click('Last modified creative', '[data-testilda-id="defaultListItem"]');
    
    //Click on Larger to smaller option
    const sizeDesc = locate('[data-testilda-id="defaultListItem"]').withText('Larger to smaller');
    I.click(sizeDesc);

    //Verify that the Sorting option is changed to Larger to Smaller
    I.see('Larger to smaller', '[data-testilda-id="defaultListItem"]');

    //Verify order of creatives for larger to smaller
    const sequenceSize = await I.grabTextFromAll('.middle-ellipsis__text');
    const expectedSize =['Interstitial', 'Banner', 'Expandable'];
    assert.deepStrictEqual(sequenceSize, expectedSize, 'Creative variants are not in descending order');
});

Scenario('Creative data validation', async ({ I }) => {
   
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    /*  Dont work to go inside iframe, I think because of cross-origin

        const rightframe = locate('[data-testilda-id="creative-variant-unit"]')
        .withDescendant('.middle-ellipsis__text')
        .withText('Banner')
        .find('iframe');
        
        await within({ frame: rightframe }, () => {
        I.see('Banner');
        });
    */

    //Verify that text Banner is displayed inside. but doesnt work
    within({ frame: 'iframe[src*="creativeId=810f934b"]' }, () => {
         I.see('Banner');
    });
});

//Not running in Github Actions CI
const isCI = !!process.env.CI;
(isCI ? Scenario.skip : Scenario)('Ads are pixel-perfect', async ({ I }) => {
    
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');
    
    I.waitNumberOfVisibleElements('[data-testilda-id="creative-variant-unit"]', 3);
    
    //Run just for the first time to save base image
    //const elementLocator = locate('[data-testilda-id="creative-variant-unit"]').withText('Expandable');
    //I.saveElementScreenshot(elementLocator, 'Expandable5.png');

    //With CodeceptJS pixelmatch helper to verify the pixels on image
    const pixelCompare = await I.getVisualDifferences("Expandable5");

    if (pixelCompare.match) {
        I.say(`Identical. Difference is ${pixelCompare.difference}%`);
    } else {
        I.say(`Different. Difference is ${pixelCompare.difference}% - review ${pixelCompare.diffImage}`);
    }
});
