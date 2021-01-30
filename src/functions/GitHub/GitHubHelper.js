import {
  getStartDateFromDescriptionString,
  replaceStartDateInDescriptionString,
  getDueDateFromDescriptionString,
  replaceDueDateInDescriptionString,
  getProgressFromDescriptionString,
  replaceProgressInDescriptionString,
  adjustURL,
} from '../Common/Parser.js';
import { 
  calculateDueDate,
  getGanttStartDate,
  getGanttUnscheduled,
  getGanttDuration,
 } from '../Common/CommonHelper.js';

export const isGitHubURL = (git_url) => {
  return /github\.com/.test(git_url);
}

const getGitHubNameSpaceFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[3];
  }
}

const getGitHubProjectFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[4];
  }
}

export const adjustGitHubAPIURL = (git_url) => {
  let url = adjustURL(git_url);
  return "https://api.github.com/repos/" + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url);
}

export const adjustGitHubURL = (git_url) => {
  let url = adjustURL(git_url);
  return "https://github.com/" + getGitHubNameSpaceFromGitURL(url) + "/" + getGitHubProjectFromGitURL(url);
}


export const generateGanttTaskFromGitHub = (description, issue_info) => {
  let start_date = getStartDateFromDescriptionString(description);
  let due_date = getDueDateFromDescriptionString(description);

  let gantt_task = {
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
  let start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");
  let due_date_str = calculateDueDate(start_date_str, gantt_task.duration);
  
  description = replaceProgressInDescriptionString(description, gantt_task.progress);
  description = replaceDueDateInDescriptionString(description, due_date_str);
  description = replaceStartDateInDescriptionString(description, start_date_str);

  return description;
}