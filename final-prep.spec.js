// If there is not istalled node.js on our working computer, first we istall it 
// and to see prove of download check it version in terminal with command node --version

// install playwright extension in visual studio code

// install playwright --> open terminal and run --> npm init playwright@latest

// to run tests use this command
// npx playwright test ./tests/midterm-example/midterm-example.spec.js --debug --headed

// Project Tasks

// fixtures/base.setup.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    page.setDefaultTimeout(10000);
    await use(page);
  }
});

// tests/login.spec.ts
import { test } from '../fixtures/base.setup';


test.describe('Login Tests', () => {
  test('successful login with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await test.expect(await page.isVisible('.oxd-topbar-header-title')).toBeTruthy();
  });

  test('unsuccessful login with invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'InvalidUser');
    await page.fill('input[name="password"]', 'InvalidPass');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.oxd-alert');
    await test.expect(await page.isVisible('.oxd-alert')).toBeTruthy();
  });

  test('verify remember me functionality', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.check('input[type="checkbox"]');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await test.expect(await page.isVisible('.oxd-topbar-header-title')).toBeTruthy();
  });
});
