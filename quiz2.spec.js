import { test, expect } from '@playwright/test';

test.describe('HTML Form Tests', () => {

  // Before each test, navigate to the local HTML file
  test.beforeEach(async ({ page }) => {
    await page.goto('file:///C:/Users/Zura/source/repos/Playwright/quiz-index.html');
  });

  test('Enter email using XPath selector and Enter password using CSS locator', async ({ page }) => {
    await page.fill('//input[@id="email"]', 'z_arabidze@cu.edu.ge');
    await page.fill('#password', 'zura-123');  
    await page.waitForTimeout(5000);
  });

  test('Select last element from gender dropdown', async ({ page }) => {
    await page.locator("#gender").selectOption("Male");
    await page.waitForTimeout(5000);
  });

  test('Select any option from dog breeds', async ({ page }) => {
    const dogBreeds = await page.$$('div[for="dog-breeds"] a');
    const randomIndex = Math.floor(Math.random() * dogBreeds.length);
    await dogBreeds[randomIndex].click();  
    await page.waitForTimeout(5000);
  });

  
  test('Select last element from "Who is the strongest" question', async ({ page }) => {
    const options = await page.$$('div[for="question3"] a');
    await options[options.length - 1].click();  
    await page.waitForTimeout(5000);
  });

  test('Select elements 1-12', async ({ page }) => {
    const elements = await page.$$('div[for="question3"] a');
    for (let element of elements) {
      await element.click(); 
    }
    await page.waitForTimeout(5000);
  });

  test('Select element using text selector', async ({ page }) => {
    await page.click('text=ვერაფერი');  
    await page.waitForTimeout(5000);
  });


test('Drag one box to another', async ({ page }) => {
    const dragBox = await page.locator("#dragBox");
    const dropBox = await page.locator("#dropBox");
    await dragBox.dragTo(dropBox);
    await page.waitForTimeout(5000);
  });
  

  test('Click on checkbox', async ({ page }) => {
    await page.click('#terms');  
    await page.click('button[type="submit"]'); 
    await page.waitForTimeout(5000);
  });
});
