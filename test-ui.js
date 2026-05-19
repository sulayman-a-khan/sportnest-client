import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Listen to console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER CONSOLE ERROR:', msg.text());
    }
  });

  // Listen to network responses
  page.on('response', response => {
    if (response.url().includes('/api/') && !response.ok()) {
      console.log(`API FAILED: ${response.url()} - Status: ${response.status()}`);
    }
  });

  try {
    // Navigate to local app
    console.log('Navigating to app...');
    await page.goto('http://localhost:5173/login');

    // Fill in login form
    console.log('Logging in...');
    await page.fill('input[type="email"]', 'test1@example.com');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');

    // Wait for navigation or successful login toast
    await page.waitForTimeout(2000);

    // Navigate to My Bookings
    console.log('Going to My Bookings...');
    await page.goto('http://localhost:5173/my-bookings');

    // Wait to see if error appears
    await page.waitForTimeout(2000);

    // Look for the toast error
    const toastErrors = await page.locator('.go3958317564').allTextContents(); // toast class
    console.log('Toast messages:', toastErrors);
    
    // Evaluate if the error text is anywhere in the DOM
    const bodyText = await page.evaluate(() => document.body.innerText);
    if (bodyText.includes('Failed to retrieve bookings')) {
      console.log('ERROR IS VISIBLE ON SCREEN!');
    } else {
      console.log('Error NOT visible.');
    }
  } catch (err) {
    console.error('Script Error:', err);
  } finally {
    await browser.close();
  }
})();
