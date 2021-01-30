import {
  getStartDateFromDescriptionString,
  replaceStartDateInDescriptionString,
  getProgressFromDescriptionString,
  replaceProgressInDescriptionString,
  adjustURL,
} from '../Common/Parser.js';
import { 
  getGanttStartDate,
  getGanttUnscheduled,
  getGanttDuration,
 } from '../Common/CommonHelper.js';

export const isGitLabURL = (git_url) => {
  return /gitlab\.com/.test(git_url);
}

const getGitLabNameSpaceFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[3];
  }
}

const getGitLabProjectFromGitURL = (git_url) => {
  let split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[4];
  }
}

export const adjustGitLabAPIURL = (git_url) => {
  let url = adjustURL(git_url);
  return "https://gitlab.com/api/v4/projects/" + getGitLabNameSpaceFromGitURL(url) + "%2F" + getGitLabProjectFromGitURL(url);
}

export const adjustGitLabURL = (git_url) => {
  let url = adjustURL(git_url);
  return "https://gitlab.com/" + getGitLabNameSpaceFromGitURL(url) + "/" + getGitLabProjectFromGitURL(url);
}

export const generateGanttTaskFromGitLab = (issue_info) => {
  let start_date = getStartDateFromDescriptionString(issue_info.description);
  let due_date = new Date(issue_info.due_date).toLocaleDateString("ja-JP");
  
  let gantt_task = {
    id: issue_info.iid,
    text: issue_info.title,
    start_date: getGanttStartDate(start_date, due_date, issue_info.created_at),
    duration: getGanttDuration(start_date, due_date),
    progress: getProgressFromDescriptionString(issue_info.description),
    unscheduled: getGanttUnscheduled(start_date, due_date),
  }
  return gantt_task;
}

export const updateGitLabDescriptionStringFromGanttTask = (description, gantt_task) => {
  let start_date_str = new Date(gantt_task.start_date).toLocaleDateString("ja-JP");

  description = replaceProgressInDescriptionString(description, gantt_task.progress);
  description = replaceStartDateInDescriptionString(description, start_date_str);

  return encodeURIComponent(description);
}