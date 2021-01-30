import moment from 'moment';

const calculateDuration = (start_date, due_date) => {
  let start_date_moment = moment(start_date);
  let due_date_moment = moment(due_date);
  return due_date_moment.diff(start_date_moment, 'days') + 1;
}

export const calculateDueDate = (start_date_str, duration) => {
  let start_date = new Date(start_date_str);
  let due_date = moment(start_date).add(duration - 1, 'd').toDate();
  return due_date.toLocaleDateString("ja-JP");
}

export const getGanttStartDate = (start_date, due_date, created_at) => {
  let start_date_str = null;
  if (start_date != null && due_date != null) {
    start_date_str = start_date.toLocaleDateString("ja-JP");
  } else {
    start_date_str = new Date(created_at).toLocaleDateString("ja-JP");
  }
  return start_date_str;
}

export const getGanttDuration = (start_date, due_date) => {
  let duration = null;
  if (start_date != null && due_date != null) {
    duration = calculateDuration(start_date, due_date);
  } else {
    duration = 1;
  }
  return duration;
}

export const getGanttUnscheduled = (start_date, due_date) => {
  let unscheduled = null;
  if (start_date != null && due_date != null) {
    unscheduled = false;
  } else {
    unscheduled = true;
  }
  return unscheduled;
}

export const updateGanttIssue = (issue, gantt) => {
  let data = [];
  let links = [];
  data.push(issue);
  data = { data: data, links: links }
  gantt.parse(data);
  gantt.sort("start_date", false);
} 