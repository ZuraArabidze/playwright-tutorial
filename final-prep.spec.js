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


import { test, expect } from '@playwright/test';

test.describe('Final exam', () => {
  test('Final', async ({ page }) => {
    // 1
    await page.goto('C:/Users/PC/Desktop/ZuraArabidze Final/tests/Final/e-commerce-finals.html');
    console.log('Current URL:', page.url());
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);

    // 2
    await page.locator('#address').fill('Temka');

    // 3
    await page.locator('#email').fill('z_arabidze@cu.edu.ge');

    // 4
    await page.locator('#phone').fill('599121314');

    // 5
    const productA = await page.locator('//div[contains(@class, "product")]//h5[text()="Product A"]/ancestor::div[contains(@class, "card")]');
    for (let i = 1; i < 5; i++) {
      await productA.locator('//button[contains(@class, "increase-quantity")]').click();
      await page.waitForTimeout(100);
    }

    // 6
    await page.getByText('Add to Cart').first().click();

    // 7
    await page.locator('#termsCheck').click();

    // 8
    const totalAmount = await page.locator('#totalPrice').textContent();
    console.log('Total Amount:', totalAmount);

    // 9, 10, 11
    let dialogi;
    page.on('dialog', async (dialog) => {
      console.log('Alert text:', dialog.message());
      await dialog.accept(); 
    });
    
    await page.waitForSelector('#purchaseButton:not([disabled])');
    
    dialogi = page.waitForEvent('dialog');
    
    await page.click('#purchaseButton');
    
    await dialogi;


    // // 9
    // await page.waitForSelector('#purchaseButton:not([disabled])');
    // await page.locator('#purchaseButton').click();

    // // 10 & 11
    // page.on('dialog', async (dialog) => {
    //     console.log('Alert text:', dialog.message());
    1
    //   });
    // // page.on('dialog', async (dialog) => {
    // //   console.log('Alert text:', dialog.message());
    // //   await dialog.accept();
    // // });

    // 12.
    const slider = page.locator('#slide-me');
    const sliderContainer = page.locator('.slider-container');
    
    const sliderBounds = await slider.boundingBox();
    const containerBounds = await sliderContainer.boundingBox();
    
    if (sliderBounds && containerBounds) {
      const targetY = sliderBounds.y + sliderBounds.height / 2;
      
      const maxX = containerBounds.x + containerBounds.width - sliderBounds.width;
      
      await page.mouse.move(sliderBounds.x + sliderBounds.width / 2, targetY);
      await page.mouse.down();
      
      await page.mouse.move(maxX, targetY, { steps: 10 });
      await page.mouse.up();
      
      await page.waitForTimeout(100);
    }

    const sliderValue = await page.locator('.slider-value').textContent();
    expect(sliderValue).toBe('5');

    await page.waitForTimeout(1000);
  });
});

