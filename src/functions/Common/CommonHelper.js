import {
  getStartDateFromBodyString,
  getDueDateFromBodyString,
  getProgressFromBodyString,
  calculateDuration,
} from './Parser.js';

export const getGanttStartDate = (description, created_at) => {
  let start_date = getStartDateFromBodyString(description);
  let due_date = getDueDateFromBodyString(description);
  let start_date_str = null;
  if (start_date != null && due_date != null) {
    start_date_str = start_date.toLocaleDateString("ja-JP");
  } else {
    start_date_str = new Date(created_at).toLocaleDateString("ja-JP");
  }
  return start_date_str;
}

export const getGanttDuration = (description) => {
  let start_date = getStartDateFromBodyString(description);
  let due_date = getDueDateFromBodyString(description);
  let duration = null;
  if (start_date != null && due_date != null) {
    duration = calculateDuration(start_date, due_date);
  } else {
    duration = 1;
  }
  return duration;
}

export const getGanttProgress = (description) => {
  return getProgressFromBodyString(description);
}

export const getGanttUnscheduled = (description) => {
  let start_date = getStartDateFromBodyString(description);
  let due_date = getDueDateFromBodyString(description);
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