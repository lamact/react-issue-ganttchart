import { adjustURL } from '../Common/Parser.js';
import { 
  getGanttStartDate,
  getGanttDuration,
  getGanttProgress,
  getGanttUnscheduled,
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
  let gantt_task = {
    id: issue_info.number,
    text: issue_info.title,
    start_date: getGanttStartDate(description, issue_info.created_at),
    duration: getGanttDuration(description),
    progress: getGanttProgress(description),
    unscheduled: getGanttUnscheduled(description),
  }
  return gantt_task;
}