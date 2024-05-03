// in this file you can append custom step methods to 'I' object
const AxeDevtoolsBuilder = require("@axe-devtools/playwright").default;
const AxeDevtoolsReporter = require("@axe-devtools/reporter").default;
const playwright = require('playwright');
const reporter = new AxeDevtoolsReporter(
  "DevTools-Reporter",
  "./a11y-results/homepageFlows"
);
let jsonPath = "./a11y-results/homepageFlows"
const exec = require("child_process").exec;
const suiteName = "DevTools-Reporter"
const rimraf = require("rimraf")
let reportsDash_json_path = './a11y-results/axeDashTemp'

module.exports = function() {
  return actor({
    checkHomepageForA11yissues: async function(url, bm, i) {
      browser = await playwright.chromium.launch({ headless: false });
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto(url)
      const results = await new AxeDevtoolsBuilder({ page }).analyze()
      reporter.logTestResult(bm , results);
      const reporter2 = new AxeDevtoolsReporter(
        "DevTools-Reporter"+i,
        "./a11y-results/axeDashTemp"
      );
      reporter2.logTestResult(bm , results);
      await browser.close();
      }
    ,
    checkRecipecardForA11yissues: async function(url) {
      browser = await playwright.chromium.launch({ headless: false });
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto(url)
      await page.locator('#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click();
      const results = await new AxeDevtoolsBuilder({ page }).analyze()
      reporter.logTestResult("homepage-altered-state", results);
      await browser.close();
    }
      ,
      createReports: async function() {
      await reporter.buildHTML("./a11y-results/html/");
      await reporter.buildJUnitXML("./a11y-results/xml/");
      await reporter.buildCSV("./a11y-results/csv/");
    }
      ,
      pushJsonToAxeReports: async function(url) {
        let api_test_key = "YOUR API KEY"
        let newUrl
        if (url.length > 40){
          newUrl = url.substr(url.length - 40);
        }
        console.log(newUrl)
        // Axe Reports is limited to 40 characters long. The newUrl variable that is created above is a truncated version of the actual url (last 40 characters of the actual url) if the length is greater than 40 characters. The user can choose to change the logic to choose any other dimension name or to modify the url in any other way to fit the criteria of the 40 char long dimension. 
        exec(`axe bulk-reports ${reportsDash_json_path} --axe-reports-api-key ${api_test_key} --send-axe-reports --axe-reports-dimensions="BenjaminMoore,URLS,${newUrl}"`,async function(err,stdout,stderr) {
      if(err) {
      throw err;
      }
      console.log(stdout);
      console.log("CLI binary execution completed");

      })
      console.log("Uploaded Reports Axe Reports Dashboard")
    }
      
      ,
      deleteTempaxeDashReportsDir: async function() {
        rimraf(`./${reportsDash_json_path}/`, () => console.log(`DELETED ./${reportsDash_json_path}/`));
      }
  });
}