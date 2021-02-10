import { isValidVariable, isValidIDName } from './CommonHelper.js';

export const removeFirstSharp = (id_str) => {
  if (id_str.length > 1 && /^#/.test(id_str)) {
    id_str = id_str.substring(1);
  }
  return id_str;
}

const removeLastSlash = (url) => {
  if (url.length > 1 && /\/$/.test(url)) {
    url = url.slice(0, -1);
  }
  return url;
}

const removeLastSpace = (url) => {
  if (url.length > 1 && / +$/.test(url)) {
    url = url.slice(0, -1);
  }
  return url;
}

export const adjustURL = (git_url) => {
  let url = git_url;
  url = removeLastSlash(url);
  url = removeLastSpace(url);
  url = removeLastSlash(url);
  url = removeLastSpace(url);
  return url;
}

export const getStartDateFromDescriptionString = (description) => {
  if (description == null) {
    return null;
  }
  let str = description.match(/start_date: \d{4}\/\d{1,2}\/\d{1,2}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{4}\/\d{1,2}\/\d{1,2}/)[0];
  return new Date(str);
}

export const replaceStartDateInDescriptionString = (description, write_str) => {
  const start_date = getStartDateFromDescriptionString(description);
  if (start_date != null) {
    return description.replace(/start_date: \d{4}\/\d{1,2}\/\d{1,2}/, "start_date: " + write_str);
  } else {
    return "start_date: " + write_str + "  \n" + description;
  }
}

export const getDueDateFromDescriptionString = (description) => {
  if (description == null) {
    return null;
  }
  let str = description.match(/due_date: \d{4}\/\d{1,2}\/\d{1,2}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{4}\/\d{1,2}\/\d{1,2}/)[0];
  return new Date(str);
}

export const replaceDueDateInDescriptionString = (description, write_str) => {
  const due_date = getDueDateFromDescriptionString(description);
  if (due_date != null) {
    return description.replace(/due_date: \d{4}\/\d{1,2}\/\d{1,2}/, "due_date: " + write_str);
  } else {
    return "due_date: " + write_str + "  \n" + description;
  }
}

export const getProgressFromDescriptionString = (description) => {
  if (description === null) {
    return null;
  }
  let str = description.match(/progress: \d{1}\.\d{1}/);
  if (str === null) {
    str = description.match(/progress: \d{1}/);
    if (str === null) {
      return null;
    } else {
      str = str[0].match(/\d{1}/)[0];
    }
  } else {
    str = str[0].match(/\d{1}\.\d{1}/)[0];
  }
  return parseFloat(str);
}

export const replaceProgressInDescriptionString = (description, write_float_number) => {
  const progress = getProgressFromDescriptionString(description);
  let write_round_str = Math.round(write_float_number * 10) / 10;
  if (progress !== null) {
    return description.replace(/progress: \d{1}\.\d{1}/, "progress: " + write_round_str);
  } else {
    return "progress: " + write_round_str + "  \n" + description;
  }
}

export const getParentFromDescriptionString = (description) => {
  if (description == null) {
    return null;
  }
  let str = description.match(/parent: #\d{1,10}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{1,10}/)[0];
  if (str !== "0") {
    return "#" + str;
  }
}

export const replaceParentInDescriptionString = (description, parnet_str) => {
  const parent = getParentFromDescriptionString(description);
  parnet_str = removeFirstSharp(parnet_str);
  if (parent !== null) {
    return description.replace(/parent: #\d{1,10}/, "parent: #" + parnet_str);
  } else {
    return "parent: #" + parnet_str + "  \n" + description;
  }
}

export const convertIDNameListToString = (list) => {
  let string = "";
  if (isValidVariable(list)) {
    list.map((info) => {
      if (isValidIDName(info)) {
        string += info.id + ":" + info.name + ","
      }
      return null;
    });
  }
  return string;
}

export const convertIDNamesStringToList = (string) => {
  let list = [];
  if (isValidVariable(string)) {
    const split_string = string.split(',');
    split_string.forEach((element, index, array) => {
      if (index < split_string.length - 1) {
        const info = element.split(':');
        const label = {
          id: info[0],
          name: info[1],
        }
        list.push(label)
      }
    });
  } else {
    list = [{ id: 0, name: "" }];
  }
  return list;
}