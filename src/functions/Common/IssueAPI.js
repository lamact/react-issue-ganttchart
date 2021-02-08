import { isGitHubURL } from '../GitHub/GitHubURLHelper.js';
import { isGitLabURL, getSelfHostingGitLabDomain } from '../GitLab/GitLabURLHelper.js';
import {
  getGitHubIssuesFromAPI,
  updateGitHubIssueFromGanttTask,
  openGitHubIssueAtBrowser,
  openGitHubNewIssueAtBrowser,
  setGitHubLabelListOfRepoFromAPI,
  setGitHubMemberListOfRepoFromAPI,
} from '../GitHub/GitHubAPI.js';
import {
  getGitLabIssuesFromAPI,
  updateGitLabIssueFromGanttTask,
  openGitLabIssueAtBrowser,
  openGitLabNewIssueAtBrowser,
  setGitLabLabelListOfRepoFromAPI,
  setGitLabMemberListOfRepoFromAPI,
} from '../GitLab/GitLabAPI.js';
import { isValidVariable } from '../Common/CommonHelper.js';

export const getIssuesFromAPI = async (gantt_parse, gantt, git_url, token, selected_labels, selected_assignee) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    getGitHubIssuesFromAPI(gantt_parse, gantt, git_url, selected_labels, selected_assignee);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    getGitLabIssuesFromAPI(gantt_parse, gantt, git_url, token, selected_labels, selected_assignee);
  }
}

export const setLabelListOfRepoFromAPI = async (setLabels, git_url, token) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    setGitHubLabelListOfRepoFromAPI(setLabels, git_url, token);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    setGitLabLabelListOfRepoFromAPI(setLabels, git_url, token);
  }
}

export const setMemberListOfRepoFromAPI = async (setMemberList, git_url, token) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    setGitHubMemberListOfRepoFromAPI(setMemberList, git_url, token);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    setGitLabMemberListOfRepoFromAPI(setMemberList, git_url, token);
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
  if (isGitHubURL(git_url)) {
    openGitHubIssueAtBrowser(gantt_task_id, git_url);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    openGitLabIssueAtBrowser(gantt_task_id, git_url);
  }
};

export const openNewIssueAtBrowser = (gantt_task, git_url) => {
  if(!isValidVariable(git_url)){
    return null;
  }
  if (isGitHubURL(git_url)) {
    openGitHubNewIssueAtBrowser(gantt_task, git_url);
  }
  if (isGitLabURL(git_url) || getSelfHostingGitLabDomain(git_url) !== null) {
    openGitLabNewIssueAtBrowser(gantt_task, git_url);
  }
}