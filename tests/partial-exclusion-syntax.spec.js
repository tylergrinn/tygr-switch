const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Single partial exclusion syntax', () => {
  const states = ['a', 'a/b', 'a/b/c', 'd'];
  const tests = ['!^a', '!^a/b'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to a/b`, writeTestCase(states, 'a/b', tests));
  it(`Hides '!^a' and '!^a/b'`, assertHidden(...tests));
  it(`Sets state to a`, writeTestCase(states, 'a', tests));
  it(`Hides '!^a'`, assertHidden('!^a'));
  it(`Shows '!^a/b`, assertVisible('!^a/b'));
});
