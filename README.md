![logo](./docs/logo.png)

# axe DevTools Codeceptjs API Example

Using axe DevTools Codeceptjs, you can integrate axe DevTools into your existing testing environment. This example project demonstrates how axe DevTools Codeceptjs is used to detect accessibility issues and generates reports in CSV, HTML, JSON, and XML formats.

## Prerequisites

- npm
- NodeJS (6.10 or higher)

## Clone Project

Follow these steps to clone and navigate to the directory:

1. Clone this repo from GitHub.
2. Open the project in your favourite code editor.
3. Navigate from the root of the repo to this example with the following command:

```sh
cd Node/codeceptjs
```

## Install Dependencies

Install the dependencies including **axe DevTools Playwright** and **DevTools reporter** for the project.

> **_NOTE:_**
> You need a valid license to use our APIs. For more information, see [Install from Deque’s Agora](https://docs.deque.com/devtools-html/4.0.0/en/node-pl-install-agora) page. After configuring the access to Deque's private registry, you can install the dependencies for this project.

The following command installs all the required dependencies to run this example project.

```sh
npm install
```

## Enter your API key

The test generates the json report and sends it to Axe Reports. In order to successfully upload the json to Axe Reports, the user needs an API key for the axe REports product.
You can follow the steps outlined on [axe Reports API Creation steps](https://docs.deque.com/devtools-for-web/4/en/cli-api-key-reports).
The newly created API key then needs to be updated in the **`steps_file.js`** on line number 50. Update the below line with the actual API key.

```let api_test_key = "YOUR API KEY"

```

## Run Tests

The test files **`example_test.js`** and **`steps_file.js`** that analyzes the page `https://broken-workshop.dequelabs.com/` for accessibility issues.

The following command runs the test files:

```sh
npm run codeceptjs
```

## Test Results

The tests generate results in the **_a11y-results_** directory.
The **`executive-report.html`** file is an executive summary report aggregating results from all scans into one page.

Every time you run **`npm run codeceptjs`**, it replaces all previously saved results with the latest results in the **`a11y-results`** directory, so if you want to retain previous test results, you should rename or save them in a different directory.

If you want to modify this project and publish your results in a folder other than **`./ally-results`**, you should update the output directory in the **`steps_file.js`** file.

## Additional Information

- [axe DevTools Playwright Overview](https://docs.deque.com/devtools-html/4.0.0/en/node-pl-overview)
- [Playwright API Reference](https://docs.deque.com/devtools-html/4.0.0/en/node-pl-ref-overview)
- [axe-core Rule Descriptions](https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md)
