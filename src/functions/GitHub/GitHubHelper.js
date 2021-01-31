import {
  getStartDateFromDescriptionString,
  replaceStartDateInDescriptionString,
  getDueDateFromDescriptionString,
  replaceDueDateInDescriptionString,
  getProgressFromDescriptionString,
  replaceProgressInDescriptionString,
} from '../Common/Parser.js';
import {
  calculateDueDate,
  getGanttStartDate,
  getGanttUnscheduled,
  getGanttDuration,
} from '../Common/CommonHelper.js';

export const generateGanttTaskFromGitHub = (description, issue_info) => {
  const start_date = getStartDateFromDescriptionString(description);
  const due_date = getDueDateFromDescriptionString(description);

  const gantt_task = {
    id: issue_info.number,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date),
    progress: getProgressFromDescriptionString(description),
    unscheduled: getGanttUnscheduled(start_date, due_date),
  }
  return gantt_task;
}

export const updateGitHubDescriptionStringFromGanttTask = (description, gantt_task) => {
  const start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");
  const due_date_str = calculateDueDate(start_date_str, gantt_task.duration);

  description = replaceProgressInDescriptionString(description, gantt_task.progress);
  description = replaceDueDateInDescriptionString(description, due_date_str);
  description = replaceStartDateInDescriptionString(description, start_date_str);

  return description;
}