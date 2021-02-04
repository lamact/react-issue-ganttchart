import { isValidVariable } from './CommonHelper.js';

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
  if (description == null) {
    return null;
  }
  let str = description.match(/progress: \d{1}\.\d{1}/);
  if (str == null) {
    return 0.1;
  }
  str = str[0].match(/\d{1}\.\d{1}/)[0];
  return parseFloat(str);
}

export const replaceProgressInDescriptionString = (description, write_float_number) => {
  const progress = getProgressFromDescriptionString(description);
  let write_round_str = Math.round(write_float_number * 10) / 10;
  if (write_float_number === "1") {
    write_float_number = "1.0"
  }
  if (progress != null) {
    return description.replace(/progress: \d{1}\.\d{1}/, "progress: " + write_round_str);
  } else {
    return "progress: " + write_round_str + "  \n" + description;
  }
}

export const convertLabelsListToString = (label_list) => {
  let label_str = "";
  if (isValidVariable(label_list)) {
    label_list.map((label) => {
      label_str += label.id + ":" + label.name + ":" + label.type + ","
      return null;
    });
  }
  return label_str;
}

export const convertLabelsStringToList = (label_str) => {
  let label_list = [];
  if (isValidVariable(label_str)) {
    const split_label = label_str.split(',');
    split_label.forEach((element, index, array) => {
      if (index < split_label.length - 1) {
        const id_label = element.split(':');
        const label = {
          id: id_label[0],
          name: id_label[1],
          type: id_label[2],
        }
        label_list.push(label)
      }
    });
  }
  return label_list;
}