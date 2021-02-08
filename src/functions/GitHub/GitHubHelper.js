import {
  getStartDateFromDescriptionString,
  replaceStartDateInDescriptionString,
  getDueDateFromDescriptionString,
  replaceDueDateInDescriptionString,
  getProgressFromDescriptionString,
  replaceProgressInDescriptionString,
  getParentFromDescriptionString,
  replaceParentInDescriptionString,
} from '../Common/Parser.js';
import {
  calculateDueDate,
  getGanttStartDate,
  getGanttDueDate,
  getGanttDuration,
} from '../Common/CommonHelper.js';

const getGitHubAssignee = (issue_info) => {
  if (issue_info.assignee !== null) {
    return issue_info.assignee.login;
  }
  return ""
}

export const generateGanttTaskFromGitHub = (description, issue_info) => {
  const start_date = getStartDateFromDescriptionString(description);
  const due_date = getDueDateFromDescriptionString(description);

  const gantt_task = {
    id: "#" + issue_info.number,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    due_date: getGanttDueDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date),
    progress: getProgressFromDescriptionString(description),
    assignee: getGitHubAssignee(issue_info),
    parent: getParentFromDescriptionString(description),
    description: description,
  }
  return gantt_task;
}

export const updateGitHubDescriptionStringFromGanttTask = (description, gantt_task) => {
  const start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");
  const due_date_str = calculateDueDate(start_date_str, gantt_task.duration);
  if ("parent" in gantt_task) {
    description = replaceParentInDescriptionString(description, "#"+gantt_task.parent);
  } else {
    description = replaceParentInDescriptionString(description, "#0");
  }
  description = replaceProgressInDescriptionString(description, gantt_task.progress);
  description = replaceDueDateInDescriptionString(description, due_date_str);
  description = replaceStartDateInDescriptionString(description, start_date_str);

  return description;
}