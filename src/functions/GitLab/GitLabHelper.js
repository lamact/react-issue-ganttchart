import { adjustURL } from '../Common/Parser.js';
import { 
  getGanttStartDate,
  getGanttDuration,
  getGanttProgress,
  getGanttUnscheduled,
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
  let gantt_task = {
    id: issue_info.iid,
    text: issue_info.title,
    start_date: getGanttStartDate(issue_info.description, issue_info.created_at),
    duration: getGanttDuration(issue_info.description),
    progress: getGanttProgress(issue_info.description),
    unscheduled: getGanttUnscheduled(issue_info.description),
  }
  return gantt_task;
}