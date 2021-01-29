
import {
  getGitHubIssuesFromAPI,
  updateGitHubIssueFromAPI,
  openGitHubIssueAtBrowser,
  openGitHubNewIssueAtBrowser,
} from './GitHubAPI.js';

const isGitHubURL = (git_url) => {
  return /github.com/.test(git_url);
}

const isGitLabURL = (git_url) => {
  return /gitLab.com/.test(git_url);
}

export const getIssuesFromAPI = async (gantt, git_url) => {
  if (isGitHubURL) {
    getGitHubIssuesFromAPI(gantt, git_url);
  }
}

export const updateIssueByAPI = (id, item, token, gantt, git_url) => {
  if (isGitHubURL) {
    updateGitHubIssueFromAPI(id, token, gantt, git_url);
  }
}

export const openIssueAtBrowser = (id, git_url) => {
  if (isGitHubURL) {
    openGitHubIssueAtBrowser(id, git_url);
  }
};

export const openNewIssueAtBrowser = (id, git_url) => {
  if (isGitHubURL) {
    openGitHubNewIssueAtBrowser(id, git_url);
  }
}