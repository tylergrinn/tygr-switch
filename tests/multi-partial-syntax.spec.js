const { serve, assertHidden, assertVisible, writeTestCase } = require('./util');

describe('Multi-partial syntax', () => {
  const states = [
    'a',
    'a/b',
    'a/b/c',
    'i',
    'i/j',
    'i/j/k',
    'x',
    'x/y',
    'x/y/z',
  ];
  const tests = ['^a ^i', '^a/b ^x', '^i/j ^a/b'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to 'a'`, writeTestCase(states, 'a', tests));
  it(`Shows '^a ^i'`, assertVisible('^a ^i'));
  it(`Hides '^a/b ^x' and '^i/j ^a/b'`, assertHidden('^a/b ^x', '^i/j ^a/b'));
  it(`Sets state to 'a/b'`, writeTestCase(states, 'a/b', tests));
  it(`Shows '^a ^i', '^a/b ^x', and '^i/j ^a/b'`, assertVisible(...tests));
  it(`Sets state to 'i/j'`, writeTestCase(states, 'i/j', tests));
  it(`Shows '^a ^i' and '^i/j ^a/b'`, assertVisible('^a ^i', '^i/j ^a/b'));
  it(`Hides '^a/b ^x`, assertHidden('^a/b ^x'));
});

describe('Partial syntax with absolute syntax', () => {
  const states = ['a', 'a/b', 'a/b/c', 'x'];
  const tests = ['^a/b x', 'a ^a/b/c'];

  let closeServer;
  before(() => {
    closeServer = serve();
  });
  after(() => closeServer());

  it(`Sets state to 'x'`, writeTestCase(states, 'x', tests));
  it(`Shows '^a/b x'`, assertVisible('^a/b x'));
  it(`Hides 'a ^a/b/c'`, assertHidden('a ^a/b/c'));
  it(`Sets state to 'a'`, writeTestCase(states, 'a', tests));
  it(`Hides '^a/b x'`, assertHidden('^a/b x'));
  it(`Shows 'a ^a/b/c'`, assertVisible('a ^a/b/c'));
});
