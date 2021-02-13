import {
  removeFirstSharp,
  removeLastSlash,
  removeLastSpace,
  getStringFromDescriptionYaml,
  getDateFromDescriptionYaml,
  getNumberFromDescriptionYaml,
  replacePropertyInDescriptionString,
  parseYamlFromDescription,
  getYamlPartFromDescription,
  convertIDNameListToString,
  convertIDNamesStringToList,
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

const failed_yaml_description_part = `\`\`\`yaml
progress: 0  
parent: 2  
`;

const failed_yaml_description_part3 = `\`\`\`yaml
progress: 0 a:   
parent: 2  
\`\`\`
`;

const success_yaml_description_struct = {
  due_date: '2021/2/13',
  parent: 2,
  progress: 0,
  start_date: '2021/2/12',
};

describe('parseYamlFromDescription', () => {
  test('start_date', () => {
    expect(parseYamlFromDescription(success_yaml_description)).toEqual(
      success_yaml_description_struct
    );
  });
  test('null', () => {
    expect(parseYamlFromDescription(null)).toBe(null);
  });
  test('null', () => {
    expect(parseYamlFromDescription(failed_yaml_description_part)).toBe(null);
  });
  test('null', () => {
    expect(parseYamlFromDescription(failed_yaml_description_part3)).toBe(null);
  });
});

const success_yaml_description = `\`\`\`yaml
progress: 0  
start_date: 2021/2/12
due_date: 2021/2/13  
parent: 2  
\`\`\`

## 概要 
issueの内容
`;

const success_yaml_description_part = `
progress: 0  
start_date: 2021/2/12
due_date: 2021/2/13  
parent: 2  
`;

const failed_yaml_description = `\`\`\`yaml
progress: 0  
parent: 2  
\`\`\`
start_date: 2021/2/12
due_date: 2021/2/13

## 概要 
issueの内容
`;

const failed_yaml_description_part2 = `\`\`\`yaml
progress: 0  
parent: 2  
start_date: 2021/2/12
due_date: 2021/2/13

## 概要 
issueの内容
`;

const failed_yaml_description_part4 = `\`\`\`yaml
progress: 0  
parent: 2  
start_date: 2021/2/123
due_date: 2021/2/13

## 概要 
issueの内容
`;

describe('getYamlPartFromDescription', () => {
  test('true', () => {
    expect(getYamlPartFromDescription(success_yaml_description)).toEqual(
      success_yaml_description_part
    );
  });
  test('null', () => {
    expect(getYamlPartFromDescription(null)).toBe(null);
  });
  test('null', () => {
    expect(getYamlPartFromDescription(12)).toBe(null);
  });
  test('null', () => {
    expect(getYamlPartFromDescription('12')).toBe(null);
  });
  test('null', () => {
    expect(getYamlPartFromDescription(failed_yaml_description_part2)).toBe(
      null
    );
  });
});

describe('getStringFromDescriptionYaml', () => {
  test('start_date', () => {
    expect(
      getStringFromDescriptionYaml(success_yaml_description, 'start_date')
    ).toBe('2021/2/12');
  });
  test('null', () => {
    expect(getStringFromDescriptionYaml(success_yaml_description, null)).toBe(
      null
    );
  });
  test('null', () => {
    expect(getStringFromDescriptionYaml(success_yaml_description, 23)).toBe(
      null
    );
  });
  test('null', () => {
    expect(
      getStringFromDescriptionYaml(success_yaml_description, 'progress')
    ).toBe(null);
  });
  test('null', () => {
    expect(getStringFromDescriptionYaml(null, 'start_date')).toBe(null);
  });
  test('null', () => {
    expect(
      getStringFromDescriptionYaml(failed_yaml_description, 'start_date')
    ).toBe(null);
  });
  test('due_date', () => {
    expect(
      getStringFromDescriptionYaml(success_yaml_description, 'due_date')
    ).toBe('2021/2/13');
  });
  test('start_date', () => {
    expect(
      getDateFromDescriptionYaml(success_yaml_description, 'start_date')
    ).toEqual(new Date('2021/2/12'));
  });
  test('due_date', () => {
    expect(
      getDateFromDescriptionYaml(success_yaml_description, 'due_date')
    ).toEqual(new Date('2021/2/13'));
  });
  test('null', () => {
    expect(getDateFromDescriptionYaml(null, 'due_date')).toBe(null);
  });
  test('null', () => {
    expect(
      getDateFromDescriptionYaml(failed_yaml_description_part4, 'start_date')
    ).toBe(null);
  });
  test('progress', () => {
    expect(
      getNumberFromDescriptionYaml(success_yaml_description, 'progress')
    ).toBe(0);
  });
  test('null', () => {
    expect(getNumberFromDescriptionYaml(null, 'progress')).toBe(null);
  });
  test('parent', () => {
    expect(
      getNumberFromDescriptionYaml(success_yaml_description, 'parent')
    ).toBe(2);
  });
  test('null', () => {
    expect(
      getNumberFromDescriptionYaml(success_yaml_description, 'start_date')
    ).toBe(null);
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

const success_changed_yaml2 = `
## 概要 
issueの内容
`;

const failed_changed_yaml = `\`\`\`
start_date: 2021/2/21
due_date: 2021/2/13
progress: 0.1
parent: 5
\`\`\`

## 概要 
issueの内容
`;

const failed_changed_yaml2 = `\`\`\`yaml
start_date: 2021/2/21
due_date: 2021/2/13
progress: 0.1
parent: 5

## 概要 
issueの内容
`;

describe('replacePropertyInDescriptionString', () => {
  test('start_date', () => {
    expect(
      replacePropertyInDescriptionString(success_yaml_description, chenged_task)
    ).toBe(success_changed_yaml);
  });
  test('start_date', () => {
    expect(
      replacePropertyInDescriptionString(success_changed_yaml, chenged_task)
    ).toBe(success_changed_yaml);
  });
  test('success_changed_yaml2', () => {
    expect(
      replacePropertyInDescriptionString(success_changed_yaml2, chenged_task)
    ).toBe(success_changed_yaml);
  });
  test('null', () => {
    expect(replacePropertyInDescriptionString(null, chenged_task)).toBe(null);
  });
  test('null', () => {
    expect(replacePropertyInDescriptionString(success_changed_yaml, null)).toBe(
      null
    );
  });
  test('null', () => {
    expect(
      replacePropertyInDescriptionString(failed_changed_yaml, chenged_task)
    ).toBe(null);
  });
  test('null', () => {
    expect(
      replacePropertyInDescriptionString(failed_changed_yaml2, chenged_task)
    ).toBe(null);
  });
});

const id_name_list = [
  { id: 131, name: 'test1' },
  { id: 124, name: 'test2' },
  { id: 421, name: 'test3' },
];

const id_name_string = '131:test1,124:test2,421:test3,';

const failed_id_name_string = '131:test1,string:test2,421:test3,';

const failed_id_name_list = [
  { id: 131, name: 'test1' },
  { id: 421, name: 'test3' },
];
describe('convertIDNameListToString', () => {
  test('true', () => {
    expect(convertIDNameListToString(id_name_list)).toBe(id_name_string);
  });
  test('null', () => {
    expect(convertIDNameListToString(null)).toBe(null);
  });
});

describe('convertIDNamesStringToList', () => {
  test('true', () => {
    expect(convertIDNamesStringToList(id_name_string)).toEqual(id_name_list);
  });
  test('null', () => {
    expect(convertIDNamesStringToList(null)).toEqual([{ id: 0, name: '' }]);
  });
  test('null', () => {
    expect(convertIDNamesStringToList(failed_id_name_string)).toEqual(
      failed_id_name_list
    );
  });
});
