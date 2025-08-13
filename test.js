const { chromium } = require('playwright');

async function googleSearch() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://google.com');
  await page.fill('input[name="q"]', 'playwright');
  await page.press('input[name="q"]', 'Enter');
  
  await browser.close();
}

googleSearch();