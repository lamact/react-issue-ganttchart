import moment from 'moment';

export const isValidVariable = (variable) => {
  if (
    variable !== null &&
    variable !== [] &&
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
  return /https?:\/\//.test(url);
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
  if (isValidVariable(start_date)) {
    start_date_str = date2string(start_date);
  } else if (isValidVariable(created_at)) {
    start_date_str = adjustDateString(created_at);
  }
  return start_date_str;
};

export const getGanttDueDate = (start_date, due_date, created_at) => {
  let _due_date = null;
  if (isValidVariable(due_date)) {
    _due_date = new Date(due_date);
  } else if (isValidVariable(created_at)) {
    _due_date = new Date(created_at);
  }
  return _due_date;
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

export const getGanttDuration = (start_date, due_date, created_at) => {
  let duration = null;
  if (!isValidVariable(due_date)) {
    return null;
  }
  if (!isValidVariable(start_date)) {
    start_date = created_at;
  }
  if (start_date != null && due_date != null) {
    duration = calculateDuration(start_date, due_date);
  } else {
    duration = 1;
  }
  return duration;
};

export const ArrangeGanttTaskToGeneratedGanttTaskForCompare = (issue_info) => {
  let arrangelink = [];
  issue_info.links.map((list) => {
    arrangelink.push({ type: list.type, target: list.target, source: list.source });
  });
  var _parent
  if (issue_info.parent == 0)
    _parent = "#0";
  else {
    _parent = issue_info.parent;
  }

  const arrange = {
    id: issue_info.id,
    text: issue_info.text,
    start_date: adjustDateString(issue_info.start_date),
    due_date: issue_info.due_date,
    duration: issue_info.duration,
    progress: issue_info.progress,
    assignee: issue_info.assignee,
    description: issue_info.description,
    update: issue_info.update,
    links: arrangelink,
    _parent: _parent,
  }
  return arrange;
};

export const isEqualGanntTask = (GanntTaskA, GanntTaskB) => {
  return (
    GanntTaskA.id == GanntTaskB.id &&
    GanntTaskA.text == GanntTaskB.text &&
    GanntTaskA.start_date == GanntTaskB.start_date &&
    GanntTaskA.due_date == GanntTaskB.due_date.toString() &&
    GanntTaskA.duration == GanntTaskB.duration &&
    GanntTaskA.progress == GanntTaskB.progress &&
    GanntTaskA.assignee == GanntTaskB.assignee &&
    // GanntTaskA.description == GanntTaskB.description &&
    GanntTaskA.update == GanntTaskB.update &&
    GanntTaskA._parent == GanntTaskB._parent &&
    JSON.stringify(GanntTaskA.links) == JSON.stringify(GanntTaskB.links)
  );
};
