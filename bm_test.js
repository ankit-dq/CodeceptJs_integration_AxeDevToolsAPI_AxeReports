const { setBrowser } = require("@codeceptjs/configure");

const AxeDevtoolsBuilder = require("@axe-devtools/playwright").default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;
Feature('Checking for a11y issues');
let i=1
const bm = "BenjaminMoore"
const url= ["https://store.benjaminmoore.com/storefront/us/en/shop-by-product/interior-exterior-primers", "https://store.benjaminmoore.com/storefront/us/en/shop-by-product/interior-paint", "https://www.benjaminmoore.com/en-us/paint-colors"]


for (let i = 0; i < url.length; i++) {
    Scenario('Checking url1 for a11y issues',async ({ I })  => {
        await I.checkHomepageForA11yissues(url[i], bm+(i+1), i+1)
        await I.createReports()
        console.log('The url being sent is'+url[i])
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(10000) /// waiting 1 second.
        await I.pushJsonToAxeReports(url[i])
        await delay(10000) /// waiting 1 second.
        await I.deleteTempaxeDashReportsDir()
        await delay(10000) /// waiting 1 second.
    });
}


