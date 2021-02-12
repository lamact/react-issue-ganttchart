import { removeFirstSharp, removeLastSlash, removeLastSpace } from './Parser';

describe('removeFirstSharp', () => {
  test('#0', () => {
    expect(removeFirstSharp('#0')).toBe('0');
  });

  test('#1', () => {
    expect(removeFirstSharp('#1')).toBe('1');
  });

  test('#1234', () => {
    expect(removeFirstSharp('#1234')).toBe('1234');
  });
});

describe('removeLastSlash', () => {
  test('a/', () => {
    expect(removeLastSlash('a/')).toBe('a');
  });

  test('a/a', () => {
    expect(removeLastSlash('a/a')).toBe('a/a');
  });
});

describe('removeLastSpace', () => {
  test('a ', () => {
    expect(removeLastSpace('a ')).toBe('a');
  });

  test('a a', () => {
    expect(removeLastSpace('a a')).toBe('a a');
  });
});