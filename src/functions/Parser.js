

export const getStartDateFromBodyString = (body) => {
  let str = body.match(/start_date: \d{4}\/\d{1,2}\/\d{1,2}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{4}\/\d{1,2}\/\d{1,2}/)[0];
  return new Date(str);
}

export const replaceStartDateInBodyString = (body, write_str) => {
  let start_date = getStartDateFromBodyString(body);
  if (start_date != null) {
    return body.replace(/start_date: \d{4}\/\d{1,2}\/\d{1,2}/, "start_date: " + write_str);
  } else {
    return "start_date: " + write_str + "\n" + body;
  }
}

export const getDueDateFromBodyString = (body) => {
  let str = body.match(/due_date: \d{4}\/\d{1,2}\/\d{1,2}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{4}\/\d{1,2}\/\d{1,2}/)[0];
  return new Date(str);
}

export const replaceDueDateInBodyString = (body, write_str) => {
  let due_date = getDueDateFromBodyString(body);
  if (due_date != null) {
    return body.replace(/due_date: \d{4}\/\d{1,2}\/\d{1,2}/, "due_date: " + write_str);
  } else {
    return "due_date: " + write_str + "\n" + body;
  }
}

export const getProgressFromBodyString = (body) => {
  let str = body.match(/progress: \d{1}\.\d{1}/);
  if (str == null) {
    return null;
  }
  str = str[0].match(/\d{1}\.\d{1}/)[0];
  return parseFloat(str);
}

export const replaceProgressInBodyString = (body, write_float_number) => {
  let progress = getProgressFromBodyString(body);
  let write_round_str = Math.round(write_float_number * 10) / 10;
  if (progress != null) {
    return body.replace(/progress: \d{1}\.\d{1}/, "progress: " + write_round_str);
  } else {
    return "progress: " + write_round_str + "\n" + body;
  }
}