import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {

  use: {
    headless: false,
    browserName: "chromium",
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "on",
    trace: "on",
    //Included for API Testing
    baseURL: 'https://restful-booker.herokuapp.com/',
    // baseURL: 'https://reqres.in/',
    extraHTTPHeaders: {
    },//End of API Testing
  },
  testDir: './tests',
  testMatch: ['apiTestSamples2.test.ts'],
  reporter: [["list"],
  ["json", { outputFile: "jsonReports/MyJsonReport.json" }],
  ["html", { open: "always" }]
  ]

}
export default config;
