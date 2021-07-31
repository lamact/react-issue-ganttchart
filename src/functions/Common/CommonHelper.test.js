import { isValidIDName, isValidVariable, validVariable, getGanttStartDate, getGanttDueDate, getGanttDuration } from './CommonHelper';

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

describe('getGanttStartDate', () => {
  test('true', () => {
    expect(getGanttStartDate(new Date('2021/2/13'), new Date('2021/2/15'), new Date('2021/2/13'))).toBe('2021/2/13');
  });
  test('true', () => {
    expect(getGanttStartDate(null, new Date('2021/2/15'), new Date('2021/2/13'))).toBe('2021/2/13');
  });
  test('true', () => {
    expect(getGanttStartDate(new Date('2021/2/13'), null, new Date('2021/2/13'))).toBe('2021/2/13');
  });
  test('true', () => {
    expect(getGanttStartDate(null, null, new Date('2021/2/13'))).toBe('2021/2/13');
  });
});


describe('getGanttDueDate', () => {
  test('true', () => {
    expect(getGanttDueDate(new Date('2021/2/13'), new Date('2021/2/15'), new Date('2021/2/13'))).toStrictEqual(new Date('2021/2/15'));
  });
  test('true', () => {
    expect(getGanttDueDate(null, new Date('2021/2/15'), new Date('2021/2/13'))).toStrictEqual(new Date('2021/2/15'));
  });
  test('true', () => {
    expect(getGanttDueDate(new Date('2021/2/13'), null, new Date('2021/2/13'))).toStrictEqual(new Date('2021/2/13'));
  });
  test('true', () => {
    expect(getGanttDueDate(null, null, new Date('2021/2/13'))).toStrictEqual(new Date('2021/2/13'));
  });
});


describe('getGanttDuration', () => {
  test('true', () => {
    expect(getGanttDuration(new Date('2021/2/13'), new Date('2021/2/15'), new Date('2021/2/13'))).toStrictEqual(3);
  });
  test('true', () => {
    expect(getGanttDuration(null, new Date('2021/2/15'), new Date('2021/2/13'))).toStrictEqual(3);
  });
  test('true', () => {
    expect(getGanttDuration(null, null, new Date('2021/2/13'))).toStrictEqual(null);
  });
});