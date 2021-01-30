import { isGitHubURL } from '../GitHub/GitHubHelper.js';
import { isGitLabURL } from '../GitLab/GitLabHelper.js';
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
  // setGitLabLabelListOfRepoFromAPI,
} from '../GitLab/GitLabAPI.js';

export const getIssuesFromAPI = async (gantt, git_url, token, selected_labels) => {
  gantt.clearAll(); 
  if (isGitHubURL(git_url)) {
    getGitHubIssuesFromAPI(gantt, git_url, selected_labels);
  }
  if (isGitLabURL(git_url)) {
    getGitLabIssuesFromAPI(gantt, git_url, token);
  }
}

export const setLabelListOfRepoFromAPI = async (_this, git_url, token) => {
  if (isGitHubURL(git_url)) {
    setGitHubLabelListOfRepoFromAPI(_this, git_url);
  }
  // if (isGitLabURL(git_url)) {
  //   setGitLabLabelListOfRepoFromAPI(gantt, git_url, token);
  // }
}

export const updateIssueByAPI = (gantt_task_id, token, gantt, git_url) => {
  if (isGitHubURL(git_url)) {
    updateGitHubIssueFromGanttTask(gantt_task_id, token, gantt, git_url);
  }
  if (isGitLabURL(git_url)) {
    updateGitLabIssueFromGanttTask(gantt_task_id, token, gantt, git_url);
  }
}

export const openIssueAtBrowser = (gantt_task_id, git_url) => {
  if (isGitHubURL(git_url)) {
    openGitHubIssueAtBrowser(gantt_task_id, git_url);
  }
  if (isGitLabURL(git_url)) {
    openGitLabIssueAtBrowser(gantt_task_id, git_url);
  }
};

export const openNewIssueAtBrowser = (gantt_task_id, git_url) => {
  if (isGitHubURL(git_url)) {
    openGitHubNewIssueAtBrowser(gantt_task_id, git_url);
  }
  if (isGitLabURL(git_url)) {
    openGitLabNewIssueAtBrowser(gantt_task_id, git_url);
  }
}