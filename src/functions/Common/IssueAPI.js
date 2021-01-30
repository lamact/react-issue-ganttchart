import { isGitHubURL } from '../GitHub/GitHubHelper.js';
import { isGitLabURL } from '../GitLab/GitLabHelper.js';
import {
  getGitHubIssuesFromAPI,
  updateGitHubIssueFromGanttTask,
  openGitHubIssueAtBrowser,
  openGitHubNewIssueAtBrowser,
} from '../GitHub/GitHubAPI.js';
import {
  getGitLabIssuesFromAPI,
  updateGitLabIssueFromGanttTask,
  openGitLabIssueAtBrowser,
  openGitLabNewIssueAtBrowser,
} from '../GitLab/GitLabAPI.js';

export const getIssuesFromAPI = async (gantt, git_url, token) => {
  gantt.clearAll(); 
  if (isGitHubURL(git_url)) {
    getGitHubIssuesFromAPI(gantt, git_url);
  }
  if (isGitLabURL(git_url)) {
    getGitLabIssuesFromAPI(gantt, git_url, token);
  }
}

export const updateIssueByAPI = (gantt_task_id, token, gantt, git_url) => {
  if (isGitHubURL(git_url)) {
    updateGitHubIssueFromGanttTask(gantt_task_id, token, gantt, git_url);
  }
  if (isGitLabURL(git_url)) {
    updateGitLabIssueFromGanttTask(gantt_task_id, token, gantt, git_url);
  }
}

export const openIssueAtBrowser = (gantt_task, git_url) => {
  if (isGitHubURL(git_url)) {
    openGitHubIssueAtBrowser(gantt_task, git_url);
  }
  if (isGitLabURL(git_url)) {
    openGitLabIssueAtBrowser(gantt_task, git_url);
  }
};

export const openNewIssueAtBrowser = (gantt_task, git_url) => {
  if (isGitHubURL(git_url)) {
    openGitHubNewIssueAtBrowser(gantt_task, git_url);
  }
  if (isGitLabURL(git_url)) {
    openGitLabNewIssueAtBrowser(gantt_task, git_url);
  }
}