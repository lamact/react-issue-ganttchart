import { adjustURL } from '../Common/Parser.js';
import {
  isValidVariable,
  isValidIDName,
  isValidURL,
} from '../Common/CommonHelper.js';

const GitHubAPIURL = 'https://api.github.com/repos/';
const GitHubURL = 'https://github.com/';

export const isGitHubURL = (git_url) => {
  if (!isValidURL(git_url)) {
    return false;
  }
  if (git_url.split('/').length < 5) {
    return false;
  }
  return /github\.com/.test(git_url);
};

export const getGitHubNameSpaceFromGitURL = (git_url) => {
  if (!isGitHubURL(git_url)) {
    return null;
  }
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[3];
  }
  return null;
};

export const getGitHubProjectFromGitURL = (git_url) => {
  if (!isGitHubURL(git_url)) {
    return null;
  }
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[4];
  }
  return null;
};

export const getGitHubAPIURLIssue = (git_url) => {
  if (!isGitHubURL(git_url)) {
    return null;
  }
  const url = adjustURL(git_url);
  return (
    GitHubAPIURL +
    getGitHubNameSpaceFromGitURL(url) +
    '/' +
    getGitHubProjectFromGitURL(url) +
    '/issues'
  );
};

export const getGitHubAPIURLIssuebyNumber = (git_url, number) => {
  if (!isGitHubURL(git_url) || !isValidVariable(number)) {
    return null;
  }
  const url = adjustURL(git_url);
  return (
    GitHubAPIURL +
    getGitHubNameSpaceFromGitURL(url) +
    '/' +
    getGitHubProjectFromGitURL(url) +
    '/issues/' +
    number
  );
};

export const getGitHubAPIURLIssueFilterd = (git_url, labels, assignee) => {
  if (
    !isGitHubURL(git_url) ||
    !isValidVariable(labels) ||
    !isValidVariable(assignee)
  ) {
    return null;
  }
  let url_query_str = '?';
  url_query_str += 'labels=';
  labels.map((label) => {
    if (isValidIDName(label)) {
      url_query_str += label.name + ',';
    }
  });

  if (isValidIDName(assignee)) {
    if (assignee.name !== '') {
      url_query_str += '&assignee=' + assignee.name;
    }
  }
  const url = adjustURL(git_url);
  return (
    GitHubAPIURL +
    getGitHubNameSpaceFromGitURL(url) +
    '/' +
    getGitHubProjectFromGitURL(url) +
    '/issues' +
    url_query_str
  );
};

export const getGitHubAPIURLLabel = (git_url) => {
  if (!isGitHubURL(git_url)) {
    return null;
  }
  const url = adjustURL(git_url);
  return (
    GitHubAPIURL +
    getGitHubNameSpaceFromGitURL(url) +
    '/' +
    getGitHubProjectFromGitURL(url) +
    '/labels'
  );
};

export const getGitHubAPIURLCollaborators = (git_url) => {
  if (!isGitHubURL(git_url)) {
    return null;
  }
  const url = adjustURL(git_url);
  return (
    GitHubAPIURL +
    getGitHubNameSpaceFromGitURL(url) +
    '/' +
    getGitHubProjectFromGitURL(url) +
    '/collaborators'
  );
};

export const getGitHubURLIssuebyNumber = (git_url, number) => {
  if (!isGitHubURL(git_url) || !isValidVariable(number)) {
    return null;
  }
  const url = adjustURL(git_url);
  return (
    GitHubURL +
    getGitHubNameSpaceFromGitURL(url) +
    '/' +
    getGitHubProjectFromGitURL(url) +
    '/issues/' +
    number
  );
};

export const getGitHubURLNewIssueWithTemplate = (git_url) => {
  if (!isGitHubURL(git_url)) {
    return null;
  }
  const url = adjustURL(git_url);
  return (
    GitHubURL +
    getGitHubNameSpaceFromGitURL(url) +
    '/' +
    getGitHubProjectFromGitURL(url) +
    '/issues/new?assignees=&labels=&title=&body='
  );
};
