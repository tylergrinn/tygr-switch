const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Multi-state element', () => {
  const states = ['a', 'b', 'c'];
  const tests = ['a b', 'a c', 'b c'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to 'c'`, writeTestCase(states, 'c', tests));
  it(`Hides 'a b'`, assertHidden('a b'));
  it(`Shows 'a c' and 'b c'`, assertVisible('a c', 'b c'));
  it(`Sets state to 'b'`, writeTestCase(states, 'b', tests));
  it(`Shows 'a b' and 'b c'`, assertVisible('a b', 'b c'));
  it(`Hides 'a c'`, assertHidden('a c'));
});
