import { isGitHubURL } from '../GitHub/GitHubURLHelper.js';
import {
  isGitLabURL,
  getSelfHostingGitLabDomain,
} from '../GitLab/GitLabURLHelper.js';
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
import { isValidURL } from '../Common/CommonHelper.js';

export const getIssuesFromAPI = async (
  git_url,
  token,
  selected_labels,
  selected_assignee
) => {
  if (!isValidURL(git_url)) {
    return Promise.resolve();
  } else if (isGitHubURL(git_url)) {
    return getGitHubIssuesFromAPI(git_url, token, selected_labels, selected_assignee);
  } else if (
    isGitLabURL(git_url) ||
    getSelfHostingGitLabDomain(git_url) !== null
  ) {
    return getGitLabIssuesFromAPI(
      git_url,
      token,
      selected_labels,
      selected_assignee
    );
  }
};

export const setLabelListOfRepoFromAPI = async (git_url, token) => {
  if (!isValidURL(git_url)) {
    return Promise.resolve();
  } else if (isGitHubURL(git_url)) {
    return setGitHubLabelListOfRepoFromAPI(git_url, token);
  } else if (
    isGitLabURL(git_url) ||
    getSelfHostingGitLabDomain(git_url) !== null
  ) {
    return setGitLabLabelListOfRepoFromAPI(git_url, token);
  }
};

export const setMemberListOfRepoFromAPI = async (git_url, token) => {
  if (!isValidURL(git_url)) {
    return Promise.resolve();
  } else if (isGitHubURL(git_url)) {
    return setGitHubMemberListOfRepoFromAPI(git_url, token);
  } else if (
    isGitLabURL(git_url) ||
    getSelfHostingGitLabDomain(git_url) !== null
  ) {
    return setGitLabMemberListOfRepoFromAPI(git_url, token);
  }
};

export const updateIssueByAPI = (gantt_task, token, gantt, git_url) => {
  if (!isValidURL(git_url)) {
    return Promise.resolve();
  } else if (isGitHubURL(git_url)) {
    return updateGitHubIssueFromGanttTask(gantt_task, token, gantt, git_url);
  } else if (
    isGitLabURL(git_url) ||
    getSelfHostingGitLabDomain(git_url) !== null
  ) {
    return updateGitLabIssueFromGanttTask(gantt_task, token, gantt, git_url);
  }
};

export const openIssueAtBrowser = (gantt_task_id, git_url) => {
  if (!isValidURL(git_url)) {
    return Promise.resolve();
  } else if (isGitHubURL(git_url)) {
    openGitHubIssueAtBrowser(gantt_task_id, git_url);
  } else if (
    isGitLabURL(git_url) ||
    getSelfHostingGitLabDomain(git_url) !== null
  ) {
    openGitLabIssueAtBrowser(gantt_task_id, git_url);
  }
};

export const openNewIssueAtBrowser = (gantt_task, git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  } else if (isGitHubURL(git_url)) {
    openGitHubNewIssueAtBrowser(gantt_task, git_url);
  } else if (
    isGitLabURL(git_url) ||
    getSelfHostingGitLabDomain(git_url) !== null
  ) {
    openGitLabNewIssueAtBrowser(gantt_task, git_url);
  }
};
