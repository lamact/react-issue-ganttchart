import {
  getStartDateFromDescriptionString,
  replaceStartDateInDescriptionString,
  getProgressFromDescriptionString,
  replaceProgressInDescriptionString,
  getParentFromDescriptionString,
  replaceParentInDescriptionString,
  removeFirstSharp,
} from '../Common/Parser.js';
import {
  getGanttStartDate,
  getGanttDueDate,
  getGanttDuration,
} from '../Common/CommonHelper.js';

const getGitLabAssignee = (issue_info) => {
  if (issue_info.assignee !== null) {
    return issue_info.assignee.name;
  }
  return ""
}

export const generateGanttTaskFromGitLab = (issue_info) => {
  const start_date = getStartDateFromDescriptionString(issue_info.description);
  const due_date = new Date(issue_info.due_date).toLocaleDateString("ja-JP");
  const gantt_task = {
    id: "#" + issue_info.iid,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    due_date: getGanttDueDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date),
    progress: getProgressFromDescriptionString(issue_info.description),
    assignee: getGitLabAssignee(issue_info),
    parent: getParentFromDescriptionString(issue_info.description),
    description: issue_info.description,
  }
  return gantt_task;
}

export const updateGitLabDescriptionStringFromGanttTask = (description, gantt_task) => {
  let start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");
  if ("parent" in gantt_task) {
    description = replaceParentInDescriptionString(description, "#" + removeFirstSharp(gantt_task.parent));
  } else {
    description = replaceParentInDescriptionString(description, "#0");
  }
  description = replaceProgressInDescriptionString(description, gantt_task.progress);
  description = replaceStartDateInDescriptionString(description, start_date_str);
  return encodeURIComponent(description);
}