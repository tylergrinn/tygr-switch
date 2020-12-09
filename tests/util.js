const playwright = require('playwright');
const sass = require('sass');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');
const http = require('http');
const assert = require('assert');

const OUTPUT = path.resolve(__dirname, 'output');
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);
const PORT = process.env.PORT || 8080;
const server = http.createServer(serveStatic(OUTPUT, { index: 'index.html' }));

const serve = () => {
  const listener = server.listen(PORT);
  return () => listener.close();
};

const writeTestCase = (states, state, tests) => () => {
  const sassFile = path.resolve(OUTPUT, 'main.scss');

  fs.writeFileSync(
    sassFile,
    `
      @use '../..' as switch;

      .container {
        @include switch.switch('test', ${states.join(', ')});
      }
    `
  );

  const { css } = sass.renderSync({
    file: sassFile,
    outputStyle: 'compressed',
  });

  fs.writeFileSync(
    path.resolve(OUTPUT, 'index.html'),
    `
      <html>
        <style>
          ${css.toString()}
        </style>
        <div class="container" data-test-state="${state}">
          ${tests
            .map((test) => `<span data-test="${test}">Test</span>`)
            .join('')}
        </div>
      </html>
    `
  );
};

const pagePromise = playwright.chromium
  .launch()
  .then((browser) => browser.newContext())
  .then((context) => context.newPage());

const assertVisibility = async (test, hidden) => {
  const page = await pagePromise;

  await page.goto(`http://localhost:${PORT}`);

  const styles = await page.evaluate(
    (test) =>
      window.getComputedStyle(document.querySelector(`[data-test='${test}']`)),
    test
  );

  assert.strictEqual(styles.display === 'none', hidden);
};

const assertHidden = (...ts) => async () => {
  const tests = [].concat(ts);
  for (const test of tests) await assertVisibility(test, true);
};

const assertVisible = (...ts) => async () => {
  const tests = [].concat(ts);
  for (const test of tests) await assertVisibility(test, false);
};

module.exports = { writeTestCase, serve, assertHidden, assertVisible };
