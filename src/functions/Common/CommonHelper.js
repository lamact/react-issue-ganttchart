import moment from 'moment';

export const isValidVariable = (variable) => {
  if (
    variable !== null &&
    variable !== void 0 &&
    variable !== ''
  ) {
    return true;
  }
  if (Array.isArray(variable)) {
    return variable.length > 0;
  }
  return false;
};

export const validVariable = (variable) => {
  if (isValidVariable(variable)) {
    return variable;
  } else {
    return '';
  }
};

export const isValidIDName = (id_name) => {
  return isValidVariable(id_name) && 'id' in id_name && 'name' in id_name;
};

export const isValidURL = (url) => {
  if (!isValidVariable(url)) {
    return false;
  }
  return /https:\/\//.test(url);
};

export const isNumber = (n) => {
  if (typeof n === 'number' && Number.isFinite(n)) {
    return true;
  }
  return false;
};

export const orgRound = (value, base) => {
  return Math.round(value / base) * base;
};

export const calculateDuration = (start_date, due_date) => {
  const start_date_moment = moment(start_date, 'YYYY/MM/DD');
  const due_date_moment = moment(due_date, 'YYYY/MM/DD');
  return due_date_moment.diff(start_date_moment, 'days') + 1;
};

export const calculateStartDate = (due_date_str, duration) => {
  const due_date = new Date(due_date_str);
  const start_date = moment(due_date, 'YYYY/MM/DD')
    .add(-duration, 'd')
    .toDate();
  return date2string(start_date);
};

export const calculateDueDate = (start_date_str, duration) => {
  const start_date = new Date(start_date_str);
  const due_date = moment(start_date, 'YYYY/MM/DD')
    .add(duration - 1, 'd')
    .toDate();
  return date2string(due_date);
};

export const dateorstring2string = (date) => {
  if (typeof date === 'string') {
    return (date);
  } else {
    return date2string(date); 
  }
}

export const date2string = (date) => {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    return null;
  } else if (isNaN(date.getFullYear())) {
    return null;
  }

  let string = date.toLocaleDateString('ja-JP');
  if (!/\d{4}\/\d{1,2}\/\d{1,2}/.test(string)) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    string = year + '/' + month + '/' + day;
  }
  return string;
};

export const adjustDateString = (date_str) => {
  return date2string(new Date(date_str));
};

export const getGanttStartDate = (start_date, due_date, created_at) => {
  let start_date_str = null;
  if (start_date != null && due_date != null) {
    start_date_str = date2string(start_date);
  } else {
    start_date_str = adjustDateString(created_at);
  }
  return start_date_str;
};

export const getGanttDueDate = (start_date, due_date, created_at) => {
  let due_date_str = null;
  if (start_date != null && due_date != null) {
    due_date_str = new Date(due_date);
  } else {
    due_date_str = new Date(created_at);
  }
  return due_date_str;
};

export const getGanttUpdateDate = (created_at, updated_at) => {
  let updated_date_str = null;
  if (updated_at != null) {
    updated_date_str = adjustDateString(updated_at);
  } else {
    updated_date_str = adjustDateString(created_at);
  }
  return updated_date_str;
};

export const getGanttDuration = (start_date, due_date) => {
  let duration = null;
  if (start_date != null && due_date != null) {
    duration = calculateDuration(start_date, due_date);
  } else {
    duration = 1;
  }
  return duration;
};
