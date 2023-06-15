import {
  isValidVariable,
  isValidIDName,
  isValidURL,
} from '../Common/CommonHelper.js';
import {
  removeLastSlash,
  removeLastSpace,
} from '../Common/Parser.js';
import { isGitHubURL } from '../GitHub/GitHubURLHelper.js';

export const isGitLabURL = (git_url) => {
  if (!isValidURL(git_url)) {
    return false;
  }
  if (git_url.split('/').length < 5) {
    return false;
  }
  return /gitlab\.com/.test(git_url);
};

export const getSelfHostingGitLabDomain = (git_url) => {
  if (isGitHubURL(git_url)) {
    return null;
  }
  if (!isValidURL(git_url)) {
    return null;
  }
  const split_git_url = git_url.split('/');
  if (split_git_url.length >= 5) {
    return split_git_url[2].replace('$$', '/');
  }
  return null;
};

export const getGitLabDomain = (git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  let gitlab_domain = null;
  const self_hosting_gitlab_domain = getSelfHostingGitLabDomain(git_url);
  if (self_hosting_gitlab_domain !== null) {
    gitlab_domain = git_url.substr(0, git_url.indexOf(':')) + '://' + self_hosting_gitlab_domain + '/';
  }
  return gitlab_domain;
};

export const getGitLabURL = (git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  return getGitLabDomain(git_url);
};

export const getGitLabAPIURL = (git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  return getGitLabDomain(git_url) + 'api/v4/';
};

export const getGitLabNameSpaceFromGitURL = (git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  git_url = removeLastSlash(removeLastSpace(git_url));
  const split_git_url = git_url.split('/');
  if (split_git_url.length == 5) {
    return split_git_url[3];
  }
  if (split_git_url.length >= 5) {
    return split_git_url.slice(3, split_git_url.length - 1).join('%2F');
  }
  return null;
};

export const getGitLabNameSpaceFromGitURLsplitSlash = (git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  git_url = removeLastSlash(removeLastSpace(git_url));
  const split_git_url = git_url.split('/');
  if (split_git_url.length == 5) {
    return split_git_url[3];
  }
  if (split_git_url.length >= 5) {
    return split_git_url.slice(3, split_git_url.length - 1).join('/');
  }
  return null;
};

export const getGitLabProjectFromGitURL = (git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  git_url = removeLastSlash(removeLastSpace(git_url));
  const split_git_url = git_url.split('/');
  if (split_git_url.length == 5) {
    return split_git_url[4];
  }
  if (split_git_url.length >= 5) {
    return split_git_url[split_git_url.length - 1];
  }
  return null;
};

export const postFixToken = (token) => {
  let post_fix_str = '?';
  if (
    isValidVariable(token) &&
    token !== 'Tokens that have not yet been entered'
  ) {
    post_fix_str += 'access_token=' + token;
  }
  return post_fix_str;
};

export const getGitLabAPIURLIssueFilterd = (
  git_url,
  token,
  labels,
  assignee
) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  if (!isValidVariable(token)) {
    return null;
  }
  if (!isValidVariable(labels)) {
    return null;
  }
  if (!isValidIDName(assignee)) {
    return null;
  }
  let post_fix_str = postFixToken(token);
  if (isValidVariable(labels)) {
    post_fix_str += '&labels=';
    labels.map((label) => {
      if (isValidIDName(label)) {
        post_fix_str += label.name + ',';
      }
      return null;
    });
  }
  if (isValidIDName(assignee)) {
    if (assignee.name !== '') {
      post_fix_str += '&assignee_id=' + assignee.id;
    }
  }
  post_fix_str += '&per_page=100&state=opened';
  return (
    getGitLabAPIURL(git_url) +
    'projects/' +
    getGitLabNameSpaceFromGitURL(git_url) +
    '%2F' +
    getGitLabProjectFromGitURL(git_url) +
    '/issues' +
    post_fix_str
  );
};

export const getGitabAPIURLIssuebyNumber = (git_url, token, number) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  if (!isValidVariable(token)) {
    return null;
  }
  if (!isValidVariable(number)) {
    return null;
  }
  const post_fix_str = postFixToken(token);
  return (
    getGitLabAPIURL(git_url) +
    'projects/' +
    getGitLabNameSpaceFromGitURL(git_url) +
    '%2F' +
    getGitLabProjectFromGitURL(git_url) +
    '/issues/' +
    number +
    post_fix_str
  );
};

export const getGitLabAPIURLLabel = (git_url, token) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  let post_fix_str = postFixToken(token);
  post_fix_str += '&per_page=100';

  return (
    getGitLabAPIURL(git_url) +
    'projects/' +
    getGitLabNameSpaceFromGitURL(git_url) +
    '%2F' +
    getGitLabProjectFromGitURL(git_url) +
    '/labels' +
    post_fix_str
  );
};

export const getGitLabAPIURLMember = (git_url, token) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  const post_fix_str = postFixToken(token);
  return (
    getGitLabAPIURL(git_url) +
    'projects/' +
    getGitLabNameSpaceFromGitURL(git_url) +
    '%2F' +
    getGitLabProjectFromGitURL(git_url) +
    '/members/all' +
    post_fix_str +
    '&per_page=200'
  );
};

export const getGitLabURLIssuebyNumber = (git_url, number) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  return (
    getGitLabURL(git_url) +
    getGitLabNameSpaceFromGitURLsplitSlash(git_url) +
    '/' +
    getGitLabProjectFromGitURL(git_url) +
    '/-/issues/' +
    number
  );
};

export const getGitLabURLNewIssueWithTemplate = (git_url) => {
  if (!isValidURL(git_url)) {
    return null;
  }
  return (
    getGitLabURL(git_url) +
    getGitLabNameSpaceFromGitURLsplitSlash(git_url) +
    '/' +
    getGitLabProjectFromGitURL(git_url) +
    '/issues/new?issue[description]='
  );
};
