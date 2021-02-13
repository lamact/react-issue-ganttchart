import { isValidIDName, isValidVariable, validVariable } from './CommonHelper';

describe('isValidVariable', () => {
  test('true', () => {
    expect(isValidVariable('aa')).toBe(true);
  });
  test('true', () => {
    expect(isValidVariable(224)).toBe(true);
  });
  test('true', () => {
    expect(isValidVariable(['a', 'b'])).toBe(true);
  });
  test('true', () => {
    expect(isValidVariable(new Date())).toBe(true);
  });
  test('false', () => {
    expect(isValidVariable(null)).toBe(false);
  });
  test('false', () => {
    expect(isValidVariable(undefined)).toBe(false);
  });
  test('false', () => {
    expect(isValidVariable('')).toBe(false);
  });
});

describe('validVariable', () => {
  test('true', () => {
    expect(validVariable('aa')).toBe('aa');
  });
  test('true', () => {
    expect(validVariable(null)).toBe('');
  });
});

describe('isValidIDName', () => {
  test('true', () => {
    expect(isValidIDName({ id: 131, name: 'test1' })).toBe(true);
  });
  test('false', () => {
    expect(isValidIDName(null)).toBe(false);
  });
  test('false', () => {
    expect(isValidIDName({ id: 21 })).toBe(false);
  });
  test('false', () => {
    expect(isValidIDName({ name: 'test1' })).toBe(false);
  });
});
