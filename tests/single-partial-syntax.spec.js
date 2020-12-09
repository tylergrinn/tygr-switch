const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Single partial syntax', () => {
  const states = ['a', 'a/b', 'a/b/c', 'd'];
  const tests = ['^a', '^a/b'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to 'a'`, writeTestCase(states, 'a', tests));
  it(`Shows '^a'`, assertVisible('^a'));
  it(`Hides '^a/b'`, assertHidden('^a/b'));
  it(`Sets state to 'a/b'`, writeTestCase(states, 'a/b', tests));
  it(`Shows '^a' and '^a/b'`, assertVisible('^a', '^a/b'));
  it(`Sets state to 'a/b/c'`, writeTestCase(states, 'a/b/c', tests));
  it(`Shows '^a' and '^a/b'`, assertVisible('^a', '^a/b'));
  it(`Sets state to 'd'`, writeTestCase(states, 'd', tests));
  it(`Hides '^a' and '^a/b'`, assertHidden('^a', '^a/b'));
});
