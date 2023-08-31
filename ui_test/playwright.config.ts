import { defineConfig, devices } from '@playwright/test';
// @ts-ignore
import path from 'path';
import * as fs from 'fs';
// @ts-ignore
import * as yaml from 'js-yaml';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
export const configData = yaml.load(fs.readFileSync(process.env.TEST_CONFIG_FILE, 'utf8'));
export const USER_STORAGE_STATE = path.join(__dirname, process.env.USER_FILE);
export const ADMIN_STORAGE_STATE = path.join(__dirname, process.env.ADMIN_FILE);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60000,
  /* Timeout is shared between all tests. */
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: configData.BaseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
      retries: 2,
      ...devices['Desktop Chrome'],
    },
    {
      name: 'user case',
      testMatch: '**/*.user.ts',
      dependencies: ['setup'],
      use: {
        storageState: USER_STORAGE_STATE,
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'admin case',
      testMatch: '**/*.admin.ts',
      dependencies: ['setup'],
      use: {
        storageState: ADMIN_STORAGE_STATE,
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    //
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
