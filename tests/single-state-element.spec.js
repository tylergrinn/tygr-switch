const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Single-state element', () => {
  const states = ['a', 'b', 'c'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to 'a'`, writeTestCase(states, 'a', states));
  it(`Shows 'a'`, assertVisible('a'));
  it(`Hides 'b' and 'c'`, assertHidden('b', 'c'));
  it(`Sets state to 'b'`, writeTestCase(states, 'b', states));
  it(`Shows 'b'`, assertVisible('b'));
  it(`Hides 'a' and 'c'`, assertHidden('a', 'c'));
});
