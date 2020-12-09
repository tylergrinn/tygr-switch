const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Single-exclusionary syntax', () => {
  const states = ['a', 'b', 'c'];
  const tests = ['!a', '!b', '!c'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to 'a'`, writeTestCase(states, 'a', tests));
  it(`Hides '!a'`, assertHidden('!a'));
  it(`Shows '!b' and '!c'`, assertVisible('!b', '!c'));
  it(`Sets state to 'c'`, writeTestCase(states, 'c', tests));
  it(`Shows '!a' and '!b'`, assertVisible('!a', '!b'));
  it(`Hides '!c'`, assertHidden('!c'));
});
