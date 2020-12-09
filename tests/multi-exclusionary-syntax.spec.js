const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Multi-exclusionary syntax', () => {
  const states = ['a', 'b', 'c'];
  const tests = ['!a !b', '!a !c', '!b !c'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to 'a'`, writeTestCase(states, 'a', tests));
  it(`Hides '!a !b' and '!a !c'`, assertHidden('!a !b', '!a !c'));
  it(`Shows '!b !c'`, assertVisible('!b !c'));
  it(`Sets state to 'b'`, writeTestCase(states, 'b', tests));
  it(`Hides '!a !b' and '!b !c'`, assertHidden('!a !b', '!b !c'));
  it(`Shows '!a !c'`, assertVisible('!a !c'));
});
