import {
  removeFirstSharp,
  removeLastSlash,
  removeLastSpace,
  getStringFromDescriptionYaml,
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  replacePropertyInDescriptionString,
} from './Parser';

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

const success_yaml = `\`\`\`yaml
progress: 0  
start_date: 2021/2/12
due_date: 2021/2/13  
parent: 2  
\`\`\`

## 概要 
issueの内容
`;

const failed_yaml = `\`\`\`yaml
progress: 0  
parent: 2  
\`\`\`
start_date: 2021/2/12
due_date: 2021/2/13

## 概要 
issueの内容
`;

describe('getStringFromDescriptionYaml', () => {
  test('start_date', () => {
    expect(getStringFromDescriptionYaml(success_yaml, 'start_date')).toBe(
      '2021/2/12'
    );
  });
  test('null', () => {
    expect(getStringFromDescriptionYaml(failed_yaml, 'start_date')).toBe(null);
  });
  test('due_date', () => {
    expect(getStringFromDescriptionYaml(success_yaml, 'due_date')).toBe(
      '2021/2/13'
    );
  });
  test('start_date', () => {
    expect(getDateFromDescriptionYaml(success_yaml, 'start_date')).toEqual(
      new Date('2021/2/12')
    );
  });
  test('due_date', () => {
    expect(getDateFromDescriptionYaml(success_yaml, 'due_date')).toEqual(
      new Date('2021/2/13')
    );
  });
  test('progress', () => {
    expect(getNumberFromDescriptionYaml(success_yaml, 'progress')).toBe(0);
  });
  test('parent', () => {
    expect(getNumberFromDescriptionYaml(success_yaml, 'parent')).toBe(2);
  });
});

const chenged_task = {
  start_date: '2021/2/21',
  due_date: '2021/2/13',
  progress: 0.1,
  parent: 5,
};

const success_changed_yaml = `\`\`\`yaml
start_date: 2021/2/21
due_date: 2021/2/13
progress: 0.1
parent: 5
\`\`\`

## 概要 
issueの内容
`;

describe('replacePropertyInDescriptionString', () => {
  test('start_date', () => {
    expect(
      replacePropertyInDescriptionString(success_yaml, chenged_task)
    ).toBe(success_changed_yaml);
  });
  test('start_date', () => {
    expect(
      replacePropertyInDescriptionString(success_changed_yaml, chenged_task)
    ).toBe(success_changed_yaml);
  });
});
