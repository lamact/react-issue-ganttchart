import { isGitHubURL } from '../GitHub/GitHubURLHelper.js';
import { isGitLabURL, getSelfHostingGitLabDomain } from '../GitLab/GitLabURLHelper.js';
import {
  getGitHubIssuesFromAPI,
  updateGitHubIssueFromGanttTask,
  openGitHubIssueAtBrowser,
  openGitHubNewIssueAtBrowser,
  setGitHubLabelListOfRepoFromAPI,
} from '../GitHub/GitHubAPI.js';
import {
  getGitLabIssuesFromAPI,
  updateGitLabIssueFromGanttTask,
  openGitLabIssueAtBrowser,
  openGitLabNewIssueAtBrowser,
  setGitLabLabelListOfRepoFromAPI,
} from '../GitLab/GitLabAPI.js';
import { isValidVariable } from '../Common/CommonHelper.js';

export const getIssuesFromAPI = async (gantt_parse, git_url, token, selected_labels) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    getGitHubIssuesFromAPI(gantt_parse, git_url, selected_labels);
  }
  if (isGitLabURL(git_url)) {
    getGitLabIssuesFromAPI(gantt_parse, git_url, token, selected_labels);
  }
}

export const setLabelListOfRepoFromAPI = async (setLabels, git_url, labels, token) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    setGitHubLabelListOfRepoFromAPI(setLabels, git_url, labels, token);
  }
  if (isGitLabURL(git_url)) {
    setGitLabLabelListOfRepoFromAPI(setLabels, git_url, token);
  }
}

export const updateIssueByAPI = (gantt_task_id, token, gantt, git_url) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    updateGitHubIssueFromGanttTask(gantt_task_id, token, gantt, git_url);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    updateGitLabIssueFromGanttTask(gantt_task_id, token, gantt, git_url);
  }
}

export const openIssueAtBrowser = (gantt_task_id, git_url) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  console.log("awqa")
  console.log(git_url)
  console.log(gantt_task_id)
  if (isGitHubURL(git_url)) {
  console.log("gfweggq")
    openGitHubIssueAtBrowser(gantt_task_id, git_url);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    openGitLabIssueAtBrowser(gantt_task_id, git_url);
  }
};

export const openNewIssueAtBrowser = (gantt_task_id, git_url) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    openGitHubNewIssueAtBrowser(gantt_task_id, git_url);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    openGitLabNewIssueAtBrowser(gantt_task_id, git_url);
  }
}