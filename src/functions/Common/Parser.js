import moment from 'moment';


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

export const getStartDateFromBodyString = (body) => {
  if (body == null) {
    return null;
  }
  let str = body.match(/start_date: \d{4}\/\d{1,2}\/\d{1,2}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{4}\/\d{1,2}\/\d{1,2}/)[0];
  return new Date(str);
}

const replaceStartDateInBodyString = (body, write_str) => {
  let start_date = getStartDateFromBodyString(body);
  if (start_date != null) {
    return body.replace(/start_date: \d{4}\/\d{1,2}\/\d{1,2}/, "start_date: " + write_str);
  } else {
    return "start_date: " + write_str + "\n" + body;
  }
}

export const getDueDateFromBodyString = (body) => {
  if (body == null) {
    return null;
  }
  let str = body.match(/due_date: \d{4}\/\d{1,2}\/\d{1,2}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{4}\/\d{1,2}\/\d{1,2}/)[0];
  return new Date(str);
}

const replaceDueDateInBodyString = (body, write_str) => {
  let due_date = getDueDateFromBodyString(body);
  if (due_date != null) {
    return body.replace(/due_date: \d{4}\/\d{1,2}\/\d{1,2}/, "due_date: " + write_str);
  } else {
    return "due_date: " + write_str + "\n" + body;
  }
}

export const getProgressFromBodyString = (body) => {
  if (body == null) {
    return null;
  }
  let str = body.match(/progress: \d{1}\.\d{1}/);
  if (str == null) {
    return 0.1;
  }
  str = str[0].match(/\d{1}\.\d{1}/)[0];
  return parseFloat(str);
}

const replaceProgressInBodyString = (body, write_float_number) => {
  let progress = getProgressFromBodyString(body);
  let write_round_str = Math.round(write_float_number * 10) / 10;
  if (progress != null) {
    return body.replace(/progress: \d{1}\.\d{1}/, "progress: " + write_round_str);
  } else {
    return "progress: " + write_round_str + "\n" + body;
  }
}

export const calculateDuration = (start_date, due_date) => {
  let start_date_moment = moment(start_date);
  let due_date_moment = moment(due_date);
  return due_date_moment.diff(start_date_moment, 'days') + 1;
}

const calculateDueDate = (start_date_str, duration) => {
  let start_date = new Date(start_date_str);
  let due_date = moment(start_date).add(duration - 1, 'd').toDate();
  return due_date.toLocaleDateString("ja-JP");
}

const updateBodyString = (body, start_date_str, due_date_str, write_float_number) => {
  body = replaceProgressInBodyString(body, write_float_number);
  body = replaceDueDateInBodyString(body, due_date_str);
  body = replaceStartDateInBodyString(body, start_date_str);
  return body;
}

export const updateBodyStringFromGanttTask = (body, gantt_task) => {
  let start_date_str = gantt_task.start_date;
  let due_date_str = calculateDueDate(start_date_str, gantt_task.duration);
  return updateBodyString(body, start_date_str, due_date_str, gantt_task.progress);
}