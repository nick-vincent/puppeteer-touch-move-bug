const puppeteer = require('puppeteer');

(async () => {
  // open blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 300 });
  await page.goto('http://www.blankwebsite.com');

  // set up listeners
  await page.$eval('html', (el) => {
    ['touchstart', 'touchmove', 'touchend'].forEach((event) => {
      el.addEventListener(event, (e) => {
        const p = document.createElement('p');
        p.innerText = `${event} called: ${e?.touches?.[0]?.clientX}, ${e?.touches?.[0]?.clientY}`;
        document.body.prepend(p);
      });
    });
  });

  // touch & drag 15 pixels
  await page.touchscreen.touchStart(1, 1);
  await page.touchscreen.touchMove(1, 16); // does NOT fire
  await page.touchscreen.touchEnd();

  // touch & drag 16 pixels
  await page.touchscreen.touchStart(1, 1);
  await page.touchscreen.touchMove(1, 17); // does fire
  await page.touchscreen.touchEnd();

  // take screenshot
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
