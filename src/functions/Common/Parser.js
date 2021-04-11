import { isValidVariable, isValidIDName, isNumber } from './CommonHelper.js';
import yaml from 'js-yaml';
import { gantt } from 'dhtmlx-gantt';

export const removeFirstSharp = (id_str) => {
  if (id_str.length > 1 && /^#/.test(id_str)) {
    id_str = id_str.substring(1);
  }
  return id_str;
};

export const removeLastSlash = (url) => {
  if (url.length > 1 && /\/$/.test(url)) {
    url = url.slice(0, -1);
  }
  return url;
};

export const removeLastSpace = (url) => {
  if (url.length > 1 && / +$/.test(url)) {
    url = url.slice(0, -1);
  }
  return url;
};

export const getYamlPartFromDescription = (description) => {
  if (description === null) {
    return null;
  }
  if (typeof description !== 'string') {
    return null;
  }
  let str = description.split(/^```yaml/);
  if (str === null || str.length < 2) {
    return null;
  }
  str = str[1].split(/```/);
  if (str === null || str.length < 2) {
    return null;
  }
  return str[0];
};

export const parseYamlFromDescription = (description) => {
  if (description === null) {
    return null;
  }
  const yaml_part = getYamlPartFromDescription(description);
  if (yaml_part === null) {
    return null;
  }

  let yaml_struct = null;
  try {
    yaml_struct = yaml.load(yaml_part);
  } catch (e) {
    gantt.message({ text: 'failed load yaml' + yaml_part, type: 'error' });
  }
  return yaml_struct;
};

export const getStringFromDescriptionYaml = (description, column_name) => {
  if (description === null) {
    return null;
  }
  const yaml_struct = parseYamlFromDescription(description);
  if (yaml_struct === null || !(column_name in yaml_struct)) {
    return null;
  }
  const string = yaml_struct[column_name];
  if (typeof string !== 'string') {
    return null;
  }
  return removeLastSpace(removeLastSpace(string));
};

export const getNumberFromDescriptionYaml = (description, column_name) => {
  if (description === null) {
    return null;
  }
  const yaml_struct = parseYamlFromDescription(description);
  if (yaml_struct === null || !(column_name in yaml_struct)) {
    return null;
  }
  const number = yaml_struct[column_name];
  if (typeof number !== 'number') {
    return null;
  }
  return number;
};

export const getDateFromDescriptionYaml = (description, column_name) => {
  if (description === null) {
    return null;
  }
  const date = getStringFromDescriptionYaml(description, column_name);
  if (!/\d{4}\/\d{1,2}\/\d{1,2}/.test(date)) {
    return null;
  }
  return new Date(date);
};

export const replacePropertyInDescriptionString = (description, task) => {
  if (description === null || task === null) {
    return null;
  }
  let task_section = yaml.dump(task);
  task_section =
    `\`\`\`yaml
` +
    task_section +
    `\`\`\``;
  let str = description.split(/^```yaml/);
  if (str === null || str.length < 2) {
    if (/```/.test(description)) {
      return null;
    }
    return task_section + '\n' + description;
  }
  const first_section = str[0];
  str = str[1].split(/```/);
  if (str === null || str.length < 2) {
    return null;
  }
  const end_section = str[1];
  if (first_section == null || end_section == null) {
    return null;
  }
  return first_section + task_section + end_section;
};

export const convertIDNameListToString = (list) => {
  let string = '';
  if (isValidVariable(list)) {
    list.map((info) => {
      if (isValidIDName(info) && isValidVariable(info.id)) {
        string += info.id + ':' + info.name + ',';
      }
      return null;
    });
    return string;
  }
  return null;
};

export const convertIDNamesStringToList = (string) => {
  let list = [];
  if (isValidVariable(string)) {
    const split_string = string.split(',');
    split_string.forEach((element, index, array) => {
      if (index < split_string.length - 1) {
        const info = element.split(':');
        if (!isNaN(parseInt(info[0]))) {
          const label = {
            id: parseInt(info[0]),
            name: info[1],
          };
          list.push(label);
        }
      }
    });
  } else {
    list = [{ id: 0, name: '' }];
  }
  return list;
};

export const getDependonFromDescriptionYaml = (description, column_name) => {
  if (description === null) {
    return null;
  }
  const yaml_struct = parseYamlFromDescription(description);
  if (yaml_struct === null || !(column_name in yaml_struct)) {
    return null;
  }
  const number = yaml_struct[column_name];
     return number;
};
